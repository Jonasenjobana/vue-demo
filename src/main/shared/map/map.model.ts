export interface PlottingItem {
  shape: PlottingType;
  color: string
  latlngs: L.LatLng[]
  id: string
  rail?: number
  groupName?: string
  iconName?: string
}
export interface PlottingOption {
  shapeType: PlottingType;
  plottingEvent?: (evt: {
    type: string,
    event: L.LeafletMouseEvent
  }) => void;
  drawStyle?: DrawStyle;
  clickable?: boolean;
}
export interface PlottingElement {
  shapeType: PlottingType;
  latlngs: L.LatLng[];
  drawStyle?: DrawStyle;
}
export class DrawStyle {
  color: string = "#000";
  fillColor: string = "red";
  fillOpacity: number = 0.2;
  lineWidth: number = 2;
  dash?: any;
  font: string = "14px serif";
  constructor(drawStyle?: Partial<DrawStyle>) {
    drawStyle && this.setInit(drawStyle);
  }
  setInit(drawStyle: Partial<DrawStyle>) {
    this.color = drawStyle.color ?? "#000";
    this.fillColor = drawStyle.fillColor ?? "red";
    this.fillOpacity = drawStyle.fillOpacity ?? 0.2;
    this.lineWidth = drawStyle.lineWidth ?? 2;
    this.font = drawStyle.font ?? "14px serif";
  }
}
export interface PlottingPolygonOption extends PlottingOption {
  shapeType: "polygon" | "rectangle" | "line";
  latlngs: L.LatLng[];
}
export interface PlottingCircleOption extends PlottingOption {
  shapeType: "circle";
  latlng: L.LatLng;
  radius: number;
}
export interface PlottingMarkerOption extends PlottingOption {
  shapeType: "marker";
  latlng: L.LatLng;
  iconType: string;
  iconSize: [number, number];
  /**默认iconSize center */
  iconAnchor?: [number, number];
}
export type PlottingType = "line" | "polygon" | "rectangle" | "circle" | "marker";
