<template>
    <ul class="map-control">
        <li>地图</li>
        <li>工具</li>
        <li>导航</li>
        <li :class="{ 'active': plotting }" @click="onDrawPlotting()">标绘</li>
    </ul>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { MAP_PROVIDE_TOKEN, usePlottingTool } from '../../../shared/hook/map/useMap';
const map = inject(MAP_PROVIDE_TOKEN)
const { plottingToolOpen, plottingToolClose, setPlottingElements } = usePlottingTool(map!);
const plotting = ref(false);
/**标绘 */
function onDrawPlotting() {
    plotting.value = !plotting.value;
    plottingToolClose();
    if (plotting.value) {
        plottingToolOpen({ shapeType: 'line' });
    }
}
</script>

<style scoped lang="less">
.map-control {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 999;
    background-color: #fff;
    border-radius: 5px;
    list-style-type: none;

    li {
        height: 30px;
        width: 100%;
        padding: 5px;
        cursor: pointer;
        border-radius: 5px;

        &:hover {
            background-color: #f5f2f2;
            color: #119cbe;
        }
    }
}
</style>