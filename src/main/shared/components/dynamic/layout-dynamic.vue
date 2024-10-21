<template>
    <div ref="refEl">
        <button @click="addComponent1()">onAdd1</button>
        <button @click="addComponent2()">onAdd2</button>
        {{ test.num }}
    </div>
</template>

<script setup lang="ts">
/**
 * @function toRefs
 */
import { VNode, createVNode, h, nextTick, onMounted, reactive, ref, render, toRefs } from 'vue';
import { useDynamicComponent } from './useDynamic';
import MapDemo from '../../../components-lib/demo/map-demo/MapDemo.vue';
import DynamicSlot from './DynamicSlot.vue';
import ButtonDemo from '../../../components-lib/demo/button-demo/ButtonDemo.vue';
const refEl = ref<HTMLElement>();
const { useCreateDynamicComponent } = useDynamicComponent();
const key = Symbol(1);
const obj = {num: 1}
const test = reactive(obj);
function addComponent1() {
    useCreateDynamicComponent({
        key,
        slotParams: {title: 'wtf'},
        appendTo: refEl,
        slotTemplate: DynamicSlot,
        component: MapDemo
    })
}
function addComponent2() {
    useCreateDynamicComponent({
        key: Symbol(2),
        appendTo: refEl,
        slotParams: {key: Symbol(2)},
        slotTemplate: DynamicSlot,
        component: ButtonDemo
    })
}
</script>

<style scoped>
div {
    border: 1px solid red;
    height: 500px;
    width: 500px;
}
</style>