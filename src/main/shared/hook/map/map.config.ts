import L from "leaflet";

export const MapDefaultOption: L.MapOptions = {
  // center: [38.712216, 117.22655],
  center: [38.700283, 123.85422],
  // maxBounds: L.latLngBounds([-90, -180], [90, 180]),
  zoom: 8,
  dragging: true,
  zoomControl: false, //
  minZoom: 1,
  maxZoom: 18,
  attributionControl: false,
  doubleClickZoom: false,
  preferCanvas: false, //如果使用，则polyline中没有_path属性
  closePopupOnClick: false, //点击地图不关闭弹出层
};
export function getWMSTileLayer() {
  const gaodeTile = L.tileLayer("http://webrd0{s}.is.autonavi.com/appmaptile?size=1&scale=1&style=8&x={x}&y={y}&z={z}", {
    subdomains: ["1", "2", "3", "4"],
  });
  return {
    gaodeTile,
  };
}