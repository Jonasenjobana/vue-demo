import L, { map } from "leaflet";
import { InjectionKey, MaybeRef, MaybeRefOrGetter, Reactive, Ref, inject, onMounted, provide, reactive, ref, shallowReactive, shallowRef, unref, watch } from "vue";
import { MapDefaultOption, getWMSTileLayer } from "./map.config";
import { PlottingElement, PlottingOption } from "../../map/map.model";
import { LeafletPlottingLayer } from "../../map/plotting.layer";
export const MAP_PROVIDE_TOKEN = Symbol("leafletMapRef") as InjectionKey<Ref<L.Map>>;
/**
 * @returns
 */
export function useSLMap(mapELRef: MaybeRef<HTMLElement>) {
  const mapRef = shallowRef();
  provide(MAP_PROVIDE_TOKEN, mapRef);
  onMounted(() => {
    const el = unref(mapELRef);
    if (!el) {
      throw new Error("mapElRef not found");
    }
    const lmap = L.map(el, MapDefaultOption);
    const { gaodeTile } = getWMSTileLayer();
    const mapWmsLayers: L.Layer[] = [];
    gaodeTile.addTo(lmap);
    mapWmsLayers.push(gaodeTile);
    mapRef.value = lmap;
  });
  return {
    mapRef,
  };
}
export function usePlottingTool(map: Ref<L.Map>) {
  let ifAdd = false;
  if (!map) throw new Error("map not found");
  const plottingLayer = shallowReactive(new LeafletPlottingLayer());
  const endFlag = plottingLayer.endPlottingFlag;
  /**
   * 开启临时标绘图层
   * @param plotting
   */
  const plottingToolOpen = (plotting: PlottingOption) => {
    if (!ifAdd) {
      plottingLayer.addTo(map!.value);
    }
    plottingLayer.setPlottingOption(plotting);
  };
  /**
   * 当前图层设置标绘元素
   */
  const setPlottingElements = (elements: PlottingElement[]) => {};
  /**回调关闭临时标绘图层 */
  const plottingToolClose = () => {
    plottingLayer.remove();
    ifAdd = false;
  };
  return {
    plottingToolOpen,
    plottingToolClose,
    setPlottingElements,
  };
}
export function useLayerInit() {}
