import { MaybeRefOrGetter, Ref, ref } from "vue";
import { DrawToolUtil } from "../hook/map/usePlotting";
import { LeafletBasicCanvasLayer } from "./leaflet.layer";
import { DrawStyle, PlottingCircleOption, PlottingItem, PlottingMarkerOption, PlottingOption, PlottingPolygonOption, PlottingType } from "./map.model";

export class LeafletPlottingLayer extends LeafletBasicCanvasLayer {
  shapeType!: PlottingType;
  /**双击取消 */
  dbCancel: boolean = false;
  drawStyle!: DrawStyle;
  tempLatlngs: L.LatLng[] = [];
  endPlottingFlag: Ref<boolean> = ref(false);
  circleElement: PlottingCircleOption[] = [];
  polygonElement: PlottingPolygonOption[] = [];
  markerElement: PlottingMarkerOption[] = [];
  constructor() {
    super();
  }
  protected redraw(): void {
    if (this.tempLatlngs && this.tempLatlngs.length > 0) {
      this.drawCircle(this.tempLatlngs[this.tempLatlngs.length - 1]);
      this.drawLine(this.tempLatlngs);
    }
  }
  setPlottingElements(elements: PlottingItem[]) {
    elements.forEach(el => {
      const {shape, latlngs, color = 'red', rail, iconName} = el;
      switch (shape) {
        case "circle":
          this.circleElement.push({
            shapeType: "circle",
            latlng: latlngs[0],
            radius: rail!,
            drawStyle: new DrawStyle({fillColor: color})
          });
          break;
        case "marker":
          this.markerElement.push({
            shapeType: "marker",
            latlng: latlngs[0],
            iconType: iconName || '--',
            iconSize: [16, 16],
            drawStyle: new DrawStyle({fillColor: color})
          });
          break;
        case "line":
        case "rectangle":
        case "polygon":
          this.polygonElement.push({
            shapeType: shape,
            latlngs: latlngs,
            drawStyle: new DrawStyle({fillColor: color})
          });
          break;
      }
    })
  }
  setPlottingOption(option: PlottingOption) {
    const { drawStyle, shapeType } = option;
    this.drawStyle = new DrawStyle(drawStyle);
    this.initEvent();
    switch (shapeType) {
      case "circle":
        break;
      case "marker":
        break;
      case "line":
        break;
      case "rectangle":
        break;
      case "polygon":
        break;
    }
    this._redraw();
  }
  initEvent() {
    this._map.on("click", (e) => {
      this.tempLatlngs.push(e.latlng);
      this._redraw();
    });
    this._map.on("dblclick", () => {
      this.endPlottingFlag.value = true;
    });
    this._map.on("mousemove", (e) => {
      if (this.endPlottingFlag.value) return;
      this.tempLatlngs.pop();
      this.tempLatlngs.push(e.latlng);
      this._redraw();
    });
  }

  initPlottingLine() {}
  drawLine(latlngs: L.LatLng[], color: string = "red") {
    if (latlngs.length < 2) return;
    const points = latlngs.map((latlng) => this._map.latLngToContainerPoint(latlng));
    DrawToolUtil.drawLine(
      this.ctx,
      points.map((pt) => [pt.x, pt.y]),
      color
    );
  }
  drawCircle(latlng: L.LatLng, color: string = "red", radius: number = 10) {
    const point = this._map.latLngToContainerPoint(latlng);
    DrawToolUtil.drawCircle(this.ctx, [point.x, point.y], color, radius);
  }
}
