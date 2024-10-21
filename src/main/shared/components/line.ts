/**
 * 管理线条
 */
export class SLUAnimeLineControl {
    constructor() {}
  }
  /**
   * @constructor
   * @param {CanvasRenderingContext2D} ctx
   * @param {SLUAnimeLineOption} animeLineOpt
   * @param {[[number, number], [number, number]]} pTuple 线元组 默认第一个为线条起点
   * canvas默认坐标系为左上角为原点
   */
  export class SLCanvasAnimeLine {
    constructor(private ctx: CanvasRenderingContext2D, public animeLineOpt: SLUAnimeLineOption) {
    }
    private pTuple: [[number, number], [number, number]] = [
      [0, 0],
      [0, 0],
    ];
    /**改变起点坐标系 指向下一个点坐标 */
    private toPoint: [number, number] = [0, 0];
    get lineWidth() {
      return this.animeLineOpt.width;
    }
    private lineLen: number = 0;
    /**原始坐标偏移弧度 到toPoint位置 */
    private radian: number = 0;
    private partials: LinePartial[] = [];
    private maxPartialCount: number = 0;
    get partialOption() {
      return this.animeLineOpt.partials || {};
    }
    /**
     * 设置线起终点
     * @param pTuple
     */
    setLine(pTuple: [[number, number], [number, number]]) {
      this.pTuple = pTuple;
      this.initTuple();
      this.initPartial();
      this.draw();
    }
    private initTuple() {
      this.toPoint = [this.pTuple[1][0] - this.pTuple[0][0], this.pTuple[1][1] - this.pTuple[0][1]];
      this.radian = Math.atan2(this.toPoint[1], this.toPoint[0]);
      this.lineLen = Math.sqrt(this.toPoint[0] * this.toPoint[0] + this.toPoint[1] * this.toPoint[1]);
      const rotate = this.radian * 180 / Math.PI
      console.log(rotate);
    }
  
    render() {
      this.updatePartial();
      this.draw();
    }
    draw() {
      const { fillColor = "#000", width = 10 } = this.animeLineOpt;
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.strokeStyle = fillColor;
      this.ctx.lineWidth = width;
      this.ctx.lineJoin = "round";
      this.ctx.lineCap = "round";
      this.ctx.moveTo(this.pTuple[0][0], this.pTuple[0][1]);
      this.ctx.lineTo(this.pTuple[1][0], this.pTuple[1][1]);
      this.ctx.stroke();
      this.ctx.restore();
    }
    /**
     * 初始化粒子
     */
    private initPartial() {
      this.partials = [];
      const {width = 4, len = 4, space = 2} = this.partialOption;
      this.maxPartialCount = Math.round(this.lineLen / (len + space)) + 1;
      new Array(this.maxPartialCount ).fill(0).forEach((el, idx) => {
        this.partials.push(new LinePartial({
          width,
          len,
          space,
          start: [-len - space + (idx * (len + space)), 0],
          radian: this.radian,
          to: this.toPoint,
        }));
      })
      console.log(this.partials)
    }
    private updatePartial() {
      this.partials = this.partials.filter(partial => partial.update());
    }
  }
  /**
   * 生成线条
   */
  export class SLUAnimeLine implements CanvasAnimeDraw {
    points: L.LatLng[];
    partials: LinePartial[];
    constructor(private map: L.Map | AMAP.Map, private animeLineOpt: SLUAnimeLineOption, private ctx: CanvasRenderingContext2D) {}
    data: CanvasAnimeElement & εMapShow & (εMapPoint | εMapPoints) = {
      animeId: "wtf",
      minZoom: 0,
      maxZoom: 50,
      latlngs: [],
    };
    prevTime: number = 0;
    animeRender: (time: number) => number = (time) => {
      const diffTime = 1000 / this.frameRate;
      const path2d = this.drawLines();
      this.drawPartials(path2d);
      // 未到下一帧 不更新状态
      if (time - this.prevTime < diffTime) {
        return this.animeProgress;
      }
      return 0;
    };
    beforeRender: () => void = () => {};
    animeProgress: number = 0;
    updateAnimeProgress: (progress: number) => void = () => {};
    frameRate: number = 60;
    updateLine(points: L.LatLng[]) {
      this.points = points;
    }
    updatePartials() {
      const partialWidth = 4,
        partialHeight = 4,
        space = 3;
      const pt = this.points.map((point) => {
        return (this.map as L.Map).latLngToContainerPoint([point.lat, point.lng]);
      });
    }
    drawLines() {
      const path2d = new Path2D();
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.lineJoin = "round";
      this.ctx.lineCap = "round";
      this.ctx.lineWidth = this.animeLineOpt.width;
      this.ctx.strokeStyle = "#ffeebba0";
      const pointTrans = this.points.map((point) => {
        const pt = (this.map as L.Map).latLngToContainerPoint([point.lat, point.lng]);
        return [pt.x, pt.y];
      });
      path2d.moveTo(pointTrans[0][0], pointTrans[0][1]);
      pointTrans.slice(1).forEach((point) => {
        path2d.lineTo(point[0], point[1]);
      });
      this.ctx.stroke(path2d);
      this.ctx.restore();
      return path2d;
    }
    drawPartials(path: Path2D) {
      this.ctx.save();
      this.ctx.clip(path);
      this.ctx.beginPath();
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(0, 0, 2000, 2000);
      this.ctx.restore();
    }
    generateArrow() {}
  }
  /**
   * 绘制动态箭头配置 >==> 对于这样的变化
   * 相当于粒子
   */
  export class LinePartial {
    constructor(private partial: LinePartialOption) {
      this.x = partial.start[0];
      this.y = partial.start[1];
    }
    get radian() {
      return this.partial.radian;
    }
    get to() {
      return this.partial.to;
    }
    get width() {
      return this.partial.width;
    }
    get len() {
      return this.partial.len;
    }
    y: number;
    x: number;
    update(): boolean {
      return true;
    }
  }
  export class LinePartialOption {
    width: number = 1;
    len: number = 1;
    start: [number, number];
    partialType?: "default" | "arrow" = "default";
    color?: string = "#000";
    radian: number = 0;
    to: [number, number];
    space: number = 3;
  }
  export interface SLUAnimeLineOption {
    /**线宽 */
    width: number;
    fillColor?: string;
    partials?: Partial<LinePartialOption>;
    speed?: number;
  }
  