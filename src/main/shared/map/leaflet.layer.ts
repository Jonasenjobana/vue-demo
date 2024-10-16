import L from "leaflet";

export class LeafletBasicCanvasLayer extends L.Layer {
  protected canvas!: HTMLCanvasElement;
  protected ctx!: CanvasRenderingContext2D;
  protected animationLoop?: number;
  constructor() {
    super();
  }
  onAdd(map: L.Map): this {
    this._map = map;
    if (!this.canvas) this._initCanvas();
    if (this.options.pane) this.getPane()?.appendChild(this.canvas);
    else map.getPanes().overlayPane.appendChild(this.canvas);
    map.on("moveend", this._reset, this);
    map.on("resize", this._reset, this);
    if (map.options.zoomAnimation && L.Browser.any3d) {
      /**缩放动画 */
      map.on("zoomanim", this._animateZoom, this);
    }
    this._reset();
    return this;
  }
  onRemove(map: L.Map): this {
    if (this.options.pane) {
      this.getPane()?.removeChild(this.canvas);
    } else {
      map.getPanes().overlayPane.removeChild(this.canvas);
    }
    map.off("moveend", this._reset, this);
    map.off("resize", this._reset, this);
    if (map.options.zoomAnimation) {
      map.off("zoomanim", this._animateZoom, this);
    }
    if (this.animationLoop) cancelAnimationFrame(this.animationLoop);
    return this;
  }
  protected redraw() {}
  /**是否成功清除 */
  protected _redraw() {
      this._clearContext();
      this.redraw();
  }
  private _clearContext(): boolean {
    let map = this._map;
    if (L.Browser.canvas && map) {
      let ctx = this.ctx,
        ww = this.canvas.width,
        hh = this.canvas.height;
      ctx.clearRect(0, 0, ww, hh); // 清空画布
      return true;
    }
    return false;
  }

  private _reset() {
    var topLeft = this._map.containerPointToLayerPoint([0, 0]);
    L.DomUtil.setPosition(this.canvas, topLeft);
    var size = this._map.getSize();
    this.canvas.width = size.x;
    this.canvas.height = size.y;
    this._redraw();
  }
  private _initCanvas() {
    this.canvas = L.DomUtil.create("canvas", "leaflet-canvas-map leaflet-layer");
    const originProp = ("" + L.DomUtil.testProp(["transformOrigin", "WebkitTransformOrigin", "msTransformOrigin"])) as any;
    this.canvas.style[originProp] = "50% 50%";
    const size = this._map.getSize();
    this.canvas.width = size.x;
    this.canvas.height = size.y;
    this.ctx = this.canvas.getContext("2d")!;
    const animated = this._map.options.zoomAnimation && L.Browser.any3d;
    L.DomUtil.addClass(this.canvas, "leaflet-zoom-" + (animated ? "animated" : "hide"));
  }
  private _animateZoom(e: any) {
    let map: any = this._map;
    var scale = map.getZoomScale(e.zoom),
      offset = map._getCenterOffset(e.center)._multiplyBy(-scale).subtract(map._getMapPanePos());
    L.DomUtil.setTransform(this.canvas, offset, scale);
  }
}
