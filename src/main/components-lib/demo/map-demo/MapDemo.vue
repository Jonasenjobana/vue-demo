<template>
    <div class="w-full h-full relative">
        <div class="map" ref="mapElRef"></div>
        <map-control></map-control>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import MapControl from './MapControl.vue';
import { useSLMap } from '../../../shared/hook/map/useMap';
const mapElRef = ref<HTMLElement>();
const { mapRef } = useSLMap(mapElRef);

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