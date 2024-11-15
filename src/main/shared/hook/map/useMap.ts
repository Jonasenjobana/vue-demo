import L, { map } from "leaflet";
import { InjectionKey, MaybeRef, MaybeRefOrGetter, Reactive, Ref, ShallowRef, inject, onMounted, provide, reactive, ref, shallowReactive, shallowRef, unref, watch } from "vue";
import { MapDefaultOption, getWMSTileLayer } from "./map.config";
import { PlottingElement, PlottingOption } from "../../map/map.model";
import { LeafletPlottingLayer } from "../../map/plotting.layer";
import * as MT from "maptalks";
export const MAP_PROVIDE_TOKEN = Symbol("leafletMapRef") as InjectionKey<ShallowRef<L.Map|MT.Map|undefined>>;
/**
 * @returns
 */
export function useSLLeafletMap(mapELRef: MaybeRef<HTMLElement | undefined>) {
  const mapRef = shallowRef<L.Map>();
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
export function useSLMapTalksMap(mapELRef: MaybeRef<HTMLElement | undefined>) {
  const mapRef = shallowRef<MT.Map>();
  provide(MAP_PROVIDE_TOKEN, mapRef);
  onMounted(() => {
    const el = unref(mapELRef);
    if (!el) {
      throw new Error("mapElRef not found");
    }
    const mt = new MT.Map(el, {
      center: [105.08052356963802, 36.04231948670001],
      zoom: 5,
      minZoom:1,
      maxZoom:19,
      spatialReference:{
        projection : 'baidu'
      },
      renderable: true,
      baseLayer: new MT.TileLayer('base', {
        'urlTemplate' : 'https://gss{s}.bdstatic.com/8bo_dTSlRsgBo1vgoIiO_jowehsv/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&udt=20170927',
        'subdomains': ['0', '1', '2', '3'],
        'attribution' :  '&copy; <a target="_blank" href="http://map.baidu.com">Baidu</a>'
      }),
      maxPitch: 45,
      layerCanvasLimitOnInteracting: 2,
    });
    mapRef.value = mt;
    console.log(mt.getDevicePixelRatio())
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
