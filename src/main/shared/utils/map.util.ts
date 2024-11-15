import "@amap/amap-jsapi-types";
import * as MT from 'maptalks';
/** 将经纬度数组转换为坐标系 
 * @param map 当前的地图 
 * @param latlngs [纬度,经度][]
 * @returns latlngs有效时返回 [x,y][]
 */
export function getPointsByLatlngs(map: AMap.Map | L.Map | MT.Map, latlngs: [number, number][] | undefined): [number, number][] {
    return latlngs?.map(e => getPointByLatlng(map, e)) || [];
}
/** 得到坐标系点位    
 * @param map 当前的地图 
 * @param latlng [纬度,经度]
 * @returns latlng有效时返回 [x,y] , 无效时返回 [-1000, -1000]
 */
export function getPointByLatlng(map: AMap.Map | L.Map | MT.Map , latlng: [number, number] | undefined): [number, number] {
    if (!latlng) return [-1000, -1000];
    let [lat = 90, lng = 180] = latlng, p: AMap.Pixel | L.Point | MT.Point;
    if (isNaN(lat) || isNaN(lng)) return [-1000, -1000];
    if ((map as L.Map).latLngToContainerPoint) {
        p = (map as L.Map).latLngToContainerPoint([lat, lng]);
    } else if((map as AMap.Map).lngLatToContainer) {
        p = (map as AMap.Map).lngLatToContainer([lng, lat]);
    } else {
        p = (map as MT.Map).coordToContainerPoint(new MT.Coordinate(lng, lat, 200));
    }
    return [p.x, p.y]
}