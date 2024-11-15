import * as MT from "maptalks";
import { MapArrowLine } from "../../canvas/canvas-arrow-line";
import CanvasLayerRenderer from "maptalks/src/renderer/layer/canvaslayer/CanvasLayerRenderer";

/**
 * @property {Object} options                  - configuration options
 * @property {Boolean} [options.animation=true]       - if the layer is an animated layer
 * @memberOf ParticleLayer
 * @instance
 */
const options: ParticleLayerOptionsType = {
  animation: true,
};

export class MTCanvasLayer extends MT.CanvasLayer {
  arrowLine!: MapArrowLine;
  animeFlag?: number;
  prepareToDraw(ctx?: CanvasRenderingContext2D): void {
    if (ctx) {
      this.arrowLine = new MapArrowLine(this.map, ctx, { isBezier: true, lineWidth: 4 });
      this.arrowLine.setAllLines([
        {
          latlngs: [
            [33.745, 117.555],
            [39.2145, 115.345],
          ],
        },
      ]);
    }
    // this.getRenderer().mustRenderOnInteracting();
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.arrowLine.updateArrowLine();
    this.arrowLine.drawAll();
  }
  onMoving(): void {
    console.log("wtf movving");
  }
  play(): this {
    return this;
  }
}
MTCanvasLayer.mergeOptions(options);
//@internal
MTCanvasLayer.registerRenderer(
  "canvas",
  class extends CanvasLayerRenderer {
    declare _shouldClear: boolean;
    declare layer: MTCanvasLayer;

    draw() {
      if (!this.canvas || !this.layer.options["animation"] || this._shouldClear) {
        this.prepareCanvas();
        this._shouldClear = false;
      }
      this.prepareDrawContext();
      this._drawLayer();
    }

    drawOnInteracting() {
      this.draw();
      this._shouldClear = false;
    }

    onSkipDrawOnInteracting() {
      this._shouldClear = true;
    }
  }
);
export type ParticleLayerOptionsType = MT.CanvasLayerOptionsType & {
  animation?: boolean;
};
