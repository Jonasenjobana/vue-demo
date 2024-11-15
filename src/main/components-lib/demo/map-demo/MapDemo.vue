<template>
    <div class="w-full h-full relative">
        <div class="map" ref="mapElRef"></div>
        <map-control></map-control>
        <button @click="fit()">ffffff</button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import MapControl from './MapControl.vue';
import { useSLLeafletMap, useSLMapTalksMap } from '../../../shared/hook/map/useMap';
import { MTCanvasLayer } from '../../../shared/map/maptalks/mt.canvas.layer';
import { LineString, VectorLayer } from 'maptalks';

const mapElRef = ref<HTMLElement>();
// const { mapRef } = useSLLeafletMap(mapElRef);
const { mapRef } = useSLMapTalksMap(mapElRef);
const drawLayer = ref<MTCanvasLayer>();
function fit() {
    const a = mapRef.value.getExtent();
    console.log(a)
}
watch(mapRef, (map) => {
    if (map) {
        const layer = drawLayer.value = new MTCanvasLayer('drawplot').addTo(map);
        var layer2 = new VectorLayer('vector', []).addTo(map);

        var line = new LineString(
            [
                map.getCenter().sub(3, 0),
                map.getCenter().add(3, 0),
                map.getCenter().add(3, 3),
                map.getCenter().add(2, 4)
            ],
            {
                symbol: {
                    'linePatternFile': '/direction-arrow.png',
                    'linePatternDx': 0,
                    'lineWidth': 20,
                    smoothness : 0.5,
                }
            }
        ).translate(0.04, 0).addTo(layer2);

        line.animate({
            symbol: {
                // 20 is the width of pattern.png to ensure seamless animation
                linePatternDx: 20
            }
        }, {
            repeat: true
        });
    }
})
</script>

<style scoped>
.map {
    height: 100%;
    width: 100%;
    position: relative;
}

.mini-map2 {
    border: 1px solid #000;
    width: 200px;
    height: 200px;
    top: 0;
    left: 0;
    position: absolute;
}
</style>