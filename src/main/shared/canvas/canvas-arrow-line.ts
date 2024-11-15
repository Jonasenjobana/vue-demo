import * as MT from "maptalks";
import { getImageCache, loadImg } from "../utils/canvas.util";
import { getPointsByLatlngs } from "../utils/map.util";
const ARROW_URL = "/direction-arrow.png";
export interface ArrowLineOption {
  /**样式配置 */
  fillColor?: string;
  strokeColor?: string;
  /**线宽 */
  lineWidth: number;
  /**粒子速度 */
  speed?: number;
  /**线条弧形过渡 */
  round?: boolean;
  partialWidth?: number;
  partialLen?: number;
  partialSpace?: number;
  /**贝塞尔曲线 */
  isBezier?: boolean;
  /**曲率 */
  degree?: number;
}
/**动态线条粒子 */
interface ArrowLinePartial {
  partialType: string;
  /**粒子宽度 */
  partialWidth: number;
  /**粒子长度 */
  partialLen: number;
  /**粒子之间间距 */
  partialSpace: number;
  lineLen: number;
  lineStart: [number, number];
  lineEnd: [number, number];
  /**箭头方向 */
  radian: number;
  /**粒子初始生成位置 */
  partialStart: [number, number];
}
export class MapArrowLine {
  constructor(private map: MT.Map, private ctx: CanvasRenderingContext2D, public animeLineOpt?: ArrowLineOption) {
    loadImg([ARROW_URL]);
    this.animeLineOpt = Object.assign({}, this.defaultOption, this.animeLineOpt);
  }
  private readonly defaultOption: ArrowLineOption = {
    lineWidth: 16,
    speed: 1,
    partialLen: 16,
    partialWidth: 16,
    fillColor: "#2a9889",
    strokeColor: "#2a9889",
  };
  private allLines: ArrowLine[] = [];
  public setAllLines(lines: { latlngs: [number, number][]; latlng?: [number, number] }[]) {
    this.clearLines();
    lines.forEach((line) => {
      let { latlngs = [], latlng } = line;
      if (latlng) {
        latlngs.push(latlng);
      }
      const arrowLines: ArrowLine[] = [];
      if (latlngs.length >= 2) {
        for (let prevIndex = 0, currentIndex = 1; currentIndex < latlngs.length; currentIndex++, prevIndex++) {
          const [startPoint, endPoint] = getPointsByLatlngs(this.map, [latlngs[prevIndex], latlngs[currentIndex]]);
          const arrowLine = new ArrowLine([latlngs[prevIndex], latlngs[currentIndex]], this.ctx, this.animeLineOpt!);
          arrowLine.setLine([startPoint, endPoint]);
          arrowLines.push(arrowLine);
        }
      }
      this.allLines.push(...arrowLines);
    });
  }
  public updateArrowLine() {
    this.allLines.forEach((line) => {
      let { latlngs } = line;
      const [startPoint, endPoint] = getPointsByLatlngs(this.map, latlngs);
      line.setLine([startPoint, endPoint]);
    });
  }
  public drawAll() {
    this.allLines.forEach((line) => line.render());
  }
  /**
   * 清除粒子内存动画
   * 防止内存泄漏
   */
  private clearLines() {
    this.allLines.forEach((line) => {
      line.clear();
    });
    this.allLines = [];
  }
}
/**
 * @constructor
 * @param {[[number, number], [number, number]] | []} latlngs // 线段起终点 如果为空数组则说明是贝塞尔曲线生成的额外线段 不需要经纬度进行计算
 * @param {CanvasRenderingContext2D} ctx
 * @param {SLPMap.ArrowLine} animeLineOpt
 * canvas默认坐标系为左上角为原点
 */
class ArrowLine {
  constructor(public latlngs: [[number, number], [number, number]] | [], private ctx: CanvasRenderingContext2D, public animeLineOpt: ArrowLineOption) {
    loadImg([ARROW_URL]);
  }
  private pTuple: [[number, number], [number, number]] = [
    [0, 0],
    [0, 0],
  ];
  /**改变起点坐标系 指向下一个点坐标 */
  private toPoint: [number, number] = [0, 0];
  /**贝塞尔曲线构成的额外线段 */
  private bezierLines: ArrowLine[] = [];
  get lineWidth() {
    return this.animeLineOpt.lineWidth;
  }
  /**
   * 线段长度过短则不绘制动画效果
   */
  private lineLen: number = 0;
  /**原始坐标偏移弧度 到toPoint位置 */
  private radian: number = 0;
  private partials: LinePartial[] = [];
  private maxPartialCount: number = 0;
  private partialAnime?: number;
  private animePrevTime: number = 0;
  /**画布内可见 */
  private visible: boolean = true;
  private lineStart: [number, number] = [0, 0];
  private lineEnd: [number, number] = [0, 0];
  get partialOption() {
    const { partialLen, partialWidth, partialSpace = 6 } = this.animeLineOpt;
    return { partialLen, partialWidth, partialSpace };
  }
  private updatePartialAnime(timeStamp?: number) {
    const { speed = 1 } = this.animeLineOpt;
    this.animePrevTime = !timeStamp ? 0 : this.animePrevTime;
    const diffTime = timeStamp! - this.animePrevTime;
    if (diffTime >= 17) {
      this.animePrevTime = timeStamp!;
      this.updatePartials();
    }
    this.partialAnime = requestAnimationFrame((timeStamp) => {
      this.updatePartialAnime(timeStamp);
    });
  }
  /**
   * 设置线起终点
   * @param pTuple
   */
  public setLine(pTuple: [[number, number], [number, number]]) {
    // 防止重复一点 更新重置位置
    if (this.pTuple.every((el, idx) => el.every((item, idx2) => item === pTuple[idx][idx2]))) return;
    this.pTuple = pTuple;
    if (!this.animeLineOpt.isBezier) {
      // 线段直接绘制
      this.initTuple();
      if (!this.visible) {
        this.partialAnime && cancelAnimationFrame(this.partialAnime);
        return;
      }
      this.initPartial();
    } else {
      // 贝塞尔曲线 生成多点线段
      this.updateBezierLines();
    }
  }
  /**
   * 生成贝塞尔曲线线段
   */
  updateBezierLines() {
    const { isBezier, degree = 1, partialLen } = this.animeLineOpt;
    this.bezierLines.forEach((line) => line.clear());
    this.bezierLines = [];
    const startPoint = this.pTuple[0];
    const endPoint = this.pTuple[1];
    const toPoint = [endPoint[0] - startPoint[0], endPoint[1] - startPoint[1]];
    let prevPoint = startPoint;
    const maxSlice = 50;
    const lineLen = Math.sqrt(toPoint[0] * toPoint[0] + toPoint[1] * toPoint[1]);
    const sliceCount = Math.floor(maxSlice * (lineLen / this.ctx.canvas.width)) || 1;
    for (let cur = 1; cur <= sliceCount; cur++) {
      const controlPoint = this.getBezierCtrlPoint(startPoint, endPoint, degree);
      const curPoint = this.getQuadraticBezierPoint(cur / sliceCount, startPoint, controlPoint, endPoint);
      // 贝塞尔曲线线段 不是贝塞尔曲线 防止套娃
      const tempLine = new ArrowLine([], this.ctx, { ...this.animeLineOpt, isBezier: false });
      tempLine.setLine([prevPoint, curPoint]);
      this.bezierLines.push(tempLine);
      prevPoint = curPoint;
    }
  }
  /**获取贝塞尔曲线的控制点
   * @param s:起点
   * @param e:终点
   * @param degree：曲度等级（越大越弯曲）
   */
  private getBezierCtrlPoint(s: [number, number], e: [number, number], degree: number = 1): [number, number] {
    const e0 = s,
      e1 = e,
      c = [(e0[0] + e1[0]) / 2, (e0[1] + e1[1]) / 2],
      d = degree;
    let x = c[0] - e0[0],
      y = c[1] - e0[1];
    /**中点到起点间的距离 */
    let len = Math.sqrt(x * x + y * y);
    /**角度 */
    let angle = Math.PI / 2 - Math.asin(y / len);
    let xd = d * Math.cos(angle) * len,
      yd = (d * Math.sin(angle) * len * x) / Math.abs(x);
    xd = isNaN(xd) ? 0 : xd;
    yd = isNaN(yd) ? 0 : yd;
    let curve: [number, number] = [c[0] + xd, c[1] - yd];
    return curve;
  }
  /**
   * 获取二次贝塞尔曲线划分任意点位置
   * @param {number} t 当前百分比
   * @param {Array} p1 起点坐标
   * @param {Array} p2 终点坐标
   * @param {Array} cp 控制点
   */
  private getQuadraticBezierPoint(t: any, p1: any, cp: any, p2: any): [number, number] {
    const [x1, y1] = p1;
    const [cx, cy] = cp;
    const [x2, y2] = p2;
    let x = (1 - t) * (1 - t) * x1 + 2 * t * (1 - t) * cx + t * t * x2;
    let y = (1 - t) * (1 - t) * y1 + 2 * t * (1 - t) * cy + t * t * y2;
    return [x, y];
  }
  /**
   * 不在画布范围内修改起始点 减少生成过多粒子
   * @returns
   */
  private initTuple() {
    const { width, height } = this.ctx.canvas;
    // 起始点在画布内
    const pv1 = this.visiblePoint(this.pTuple[0], [width, height]);
    // 终止点在画布内
    const pv2 = this.visiblePoint(this.pTuple[1], [width, height]);
    /**起始点到终止点的方向 */
    const dir = this.directionLine(this.pTuple[0], this.pTuple[1]);
    let [x1, y1] = this.pTuple[0];
    let [x2, y2] = this.pTuple[1];
    this.visible = true;
    if (!pv1 || !pv2) {
      // 处理边界
      if (y1 == y2) {
        if (y1 < 0 || y1 > height) {
          this.visible = false;
          return;
        }
        // canvas width 与y 轴交点
        if (pv1 && !pv2) {
          // p1 合法 p2 超边界
          x2 = dir == "right" ? width : 0;
        } else if (pv2 && !pv1) {
          // p2 合法 p1超边界
          x1 = dir == "right" ? 0 : width;
        } else {
          // 都非法
          if ((dir == "right" && (x1 >= width || x2 <= 0)) || (dir == "left" && (x1 <= 0 || x2 >= width))) {
            this.visible = false;
            return;
          }
          x1 = dir == "right" ? 0 : width;
          x2 = dir == "right" ? width : 0;
        }
      } else if (x1 == x2) {
        if (x1 < 0 || x1 > width) {
          this.visible = false;
          return;
        }
        // canvas width 与x 轴交点
        if (pv1 && !pv2) {
          // p1 合法 p2 超边界
          y2 = dir == "top" ? 0 : height;
        } else if (pv2 && !pv1) {
          // p2 合法 p1超边界
          y1 = dir == "top" ? height : 0;
        } else {
          // 都非法
          if ((dir == "top" && (y1 <= 0 || y2 >= height)) || (dir == "bottom" && (y1 >= height || y2 <= 0))) {
            this.visible = false;
            return;
          }
          y1 = dir == "top" ? height : 0;
          y2 = dir == "top" ? 0 : height;
        }
      } else {
        /**起始点构成的直线 */
        const k = (y2 - y1) / (x2 - x1);
        /**y轴交点 */
        const b = y1 - k * x1;
        // 与上边界 (y = 0) 交点
        const xIntersectTop = -b / k;
        // 与下边界 (y = height) 交点
        const xIntersectBottom = (height - b) / k;
        // 与左边界 (x = 0) 交点
        const yIntersectLeft = b;
        // 与右边界 (x = width) 交点
        const yIntersectRight = k * width + b;
        if (pv1) {
          // 起始点在画布内连线
          switch (dir) {
            case "topleft":
              // 要么和y=0直线交点 要么和 x=0 的垂线交点
              [x2, y2] = xIntersectTop >= 0 && xIntersectTop <= width ? [xIntersectTop, 0] : [0, yIntersectLeft];
              break;
            case "topright":
              // 要么和y=height直线交点 要么和 x=width 的垂线交点
              [x2, y2] = xIntersectTop >= 0 && xIntersectTop <= width ? [xIntersectTop, 0] : [width, yIntersectRight];
              break;
            case "bottomleft":
              // 要么和y=height直线交点 要么和 x=0 的垂线交点
              [x2, y2] = xIntersectBottom >= 0 && xIntersectBottom <= width ? [xIntersectBottom, height] : [0, yIntersectLeft];
              break;
            case "bottomright":
              // 要么和y=0直线交点 要么和 x=width 的垂线交点
              [x2, y2] = xIntersectBottom >= 0 && xIntersectBottom <= width ? [xIntersectBottom, height] : [width, yIntersectRight];
              break;
            default:
              this.visible = false;
              return;
          }
        } else if (pv2) {
          // 终止点在画布内连线
          switch (dir) {
            case "topleft":
              // 要么和y=0直线交点 要么和 x=width 的垂线交点
              [x1, y1] = xIntersectBottom >= 0 && xIntersectBottom <= width ? [xIntersectBottom, height] : [width, yIntersectRight];
              break;
            case "topright":
              // 要么和y=height直线交点 要么和 x=0 的垂线交点
              [x1, y1] = xIntersectBottom >= 0 && xIntersectBottom <= width ? [xIntersectBottom, height] : [0, yIntersectLeft];
              break;
            case "bottomleft":
              // 要么和y=height直线交点 要么和 x=width 的垂线交点
              [x1, y1] = xIntersectTop >= 0 && xIntersectTop <= width ? [xIntersectTop, 0] : [width, yIntersectRight];
              break;
            case "bottomright":
              // 要么和y=0直线交点 要么和 x=0 的垂线交点
              [x1, y1] = xIntersectTop >= 0 && xIntersectTop <= width ? [xIntersectTop, 0] : [0, yIntersectLeft];
              break;
            default:
              this.visible = false;
              return;
          }
        } else {
          // 都不在画布内 需判断中间点
          // 计算是否合法与画布交点
          // 需排除延长线的交点
          switch (dir) {
            case "topleft":
              if (x1 <= 0 || y1 <= 0 || x2 >= width || y2 >= height) {
                this.visible = false;
                return;
              }
              [x1, y1] = xIntersectBottom >= 0 && xIntersectBottom <= width ? [xIntersectBottom, height] : [width, yIntersectRight];
              [x2, y2] = xIntersectTop >= 0 && xIntersectTop <= width ? [xIntersectTop, 0] : [0, yIntersectLeft];
              break;
            case "topright":
              if (x1 >= width || y1 <= 0 || x2 <= 0 || y2 >= height) {
                this.visible = false;
                return;
              }
              [x1, y1] = xIntersectBottom >= 0 && xIntersectBottom <= width ? [xIntersectBottom, height] : [0, yIntersectLeft];
              [x2, y2] = xIntersectTop >= 0 && xIntersectTop <= width ? [xIntersectTop, 0] : [width, yIntersectRight];
              break;
            case "bottomleft":
              if (x1 <= 0 || y1 >= height || x2 >= width || y2 <= 0) {
                this.visible = false;
                return;
              }
              [x1, y1] = xIntersectTop >= 0 && xIntersectTop <= width ? [xIntersectTop, 0] : [width, yIntersectRight];
              [x2, y2] = xIntersectBottom >= 0 && xIntersectBottom <= width ? [xIntersectBottom, height] : [0, yIntersectLeft];
              break;
            case "bottomright":
              if (x1 >= width || y1 >= height || x2 <= 0 || y2 <= 0) {
                this.visible = false;
                return;
              }
              [x1, y1] = xIntersectTop >= 0 && xIntersectTop <= width ? [xIntersectTop, 0] : [0, yIntersectLeft];
              [x2, y2] = xIntersectBottom >= 0 && xIntersectBottom <= width ? [xIntersectBottom, height] : [width, yIntersectRight];
              break;
            default:
              this.visible = false;
              return;
          }
          // 中间线的交点也需要在画布内
          if (!this.visiblePoint([x1, y1], [width, height]) || !this.visiblePoint([x2, y2], [width, height])) {
            this.visible = false;
            return;
          }
        }
      }
    }
    this.toPoint = [x2 - x1, y2 - y1];
    this.radian = Math.atan2(this.toPoint[1], this.toPoint[0]);
    this.lineLen = Math.sqrt(this.toPoint[0] * this.toPoint[0] + this.toPoint[1] * this.toPoint[1]);
    this.lineStart = [x1, y1];
    this.lineEnd = [x2, y2];
    console.log(this.lineLen, this.toPoint, pv1, pv2, (this.radian * 180) / Math.PI);
  }

  public render() {
    if (!this.animeLineOpt.isBezier) {
      this.draw();
    }
    this.bezierLines.forEach((line) => line.render());
  }
  private draw() {
    if (!this.visible) return;
    const { fillColor = "#2a9889", lineWidth, round = true } = this.animeLineOpt;
    // 路径 用于clip限制线条动画在线条范围内
    const linePath = new Path2D();
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = fillColor;
    this.ctx.translate(this.lineStart[0], this.lineStart[1]);
    this.ctx.rotate(this.radian);
    if (round) {
      const radius = lineWidth / 2;
      const halfWidth = lineWidth / 2;
      // 左上角
      linePath.moveTo(0, -halfWidth);
      // 右上角
      linePath.lineTo(this.lineLen, -halfWidth);
      linePath.arc(this.lineLen, 0, radius, -Math.PI / 2, Math.PI / 2, false);
      linePath.lineTo(0, halfWidth);
      linePath.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2, true);
      linePath.closePath();
    } else {
      linePath.moveTo(0, -lineWidth / 2);
      linePath.lineTo(this.lineLen, -lineWidth / 2);
      linePath.lineTo(this.lineLen, lineWidth / 2);
      linePath.lineTo(0, lineWidth / 2);
      linePath.closePath();
    }
    this.ctx.fill(linePath);
    this.ctx.restore();
    this.partials.forEach((partial) => partial.draw(this.ctx, linePath));
  }
  /**
   * 初始化粒子
   */
  private initPartial() {
    this.partials = [];
    const { partialWidth = 16, partialLen = 12, partialSpace } = this.partialOption;
    this.maxPartialCount = Math.ceil(this.lineLen / (partialLen! + partialSpace)) + 1;
    new Array(this.maxPartialCount).fill(0).forEach((el, idx) => {
      this.partials.push(
        new LinePartial({
          partialWidth,
          partialLen,
          partialType: "arrow",
          partialSpace,
          partialStart: [idx * (partialLen! + partialSpace), -partialWidth! / 2],
          radian: this.radian,
          lineLen: this.lineLen,
          lineStart: this.lineStart,
          lineEnd: this.lineEnd,
        })
      );
    });
    this.partialAnime && cancelAnimationFrame(this.partialAnime);
    this.updatePartialAnime();
  }
  public updatePartials() {
    this.partials = this.partials.filter((partial) => partial.update(this.ctx));
    if (this.partials && this.partials.length < this.maxPartialCount + 1) {
      const { partialWidth = 16, partialLen = 12, partialSpace = 6 } = this.partialOption;
      const { x, y } = this.partials[0];
      this.partials.unshift(
        new LinePartial({
          partialType: "arrow",
          partialWidth,
          partialLen,
          partialSpace,
          /**粒子出生位置 */
          partialStart: [x - partialLen! - partialSpace, -partialWidth! / 2],
          radian: this.radian,
          lineLen: this.lineLen,
          lineStart: this.lineStart,
          lineEnd: this.lineEnd,
        })
      );
    }
  }
  /**
   * 清除粒子周期更新
   */
  public clear() {
    this.partials = [];
    this.partialAnime && cancelAnimationFrame(this.partialAnime);
    this.bezierLines.forEach((line) => line.clear());
  }
  private visiblePoint(point: [number, number], range: [number, number]) {
    const [x, y] = point,
      [w, h] = range;
    if (x < 0 || y < 0) {
      return false;
    } else if (x > w || y > h) {
      return false;
    }
    return true;
  }

  /**
   * 线段连线方向
   * @param point1
   * @param point2
   * @returns
   */
  private directionLine(point1: [number, number], point2: [number, number]) {
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    if (x1 == x2 && y1 > y2) return "top";
    if (x1 == x2 && y1 < y2) return "bottom";
    if (y1 == y2 && x1 > x2) return "left";
    if (y1 == y2 && x1 < x2) return "right";
    if (x1 > x2 && y1 > y2) return "topleft";
    if (x1 > x2 && y1 < y2) return "bottomleft";
    if (x1 < x2 && y1 > y2) return "topright";
    if (x1 < x2 && y1 < y2) return "bottomright";
    return "undefined";
  }
}
class LinePartial {
  constructor(private partial: ArrowLinePartial) {
    this.x = partial.partialStart[0];
    this.y = partial.partialStart[1];
  }
  y: number;
  x: number;
  public draw(ctx: CanvasRenderingContext2D, path: Path2D) {
    const { partialType = "default", lineStart, radian, partialWidth, partialLen } = this.partial;
    ctx.save();
    ctx.translate(lineStart[0], lineStart[1]);
    ctx.rotate(radian);
    ctx.clip(path);
    if (partialType === "arrow") {
      
      // ctx.fillStyle = "red";
      // ctx.fillRect(this.x, this.y, partialLen, partialWidth);
      ctx.translate(this.x + partialLen / 2, -partialWidth / 2);
      ctx.rotate(Math.PI / 2);
      const img = getImageCache(ARROW_URL);
      img && ctx.drawImage(img, 0, 0, partialLen, partialWidth);
    } else {
      // 单纯粒子
      ctx.fillStyle = "red";
      ctx.fillRect(this.x, this.y, partialLen, partialWidth);
    }
    ctx.restore();
  }
  public update(ctx: CanvasRenderingContext2D): boolean {
    if (this.x > this.partial.lineLen + this.partial.partialSpace + this.partial.partialLen) {
      return false;
    }
    this.x += 1;
    return true;
  }
}
