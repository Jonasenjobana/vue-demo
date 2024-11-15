<template>
    <div ref="refEl">
        <button @click="addComponent1()">onAdd1</button>
        <button @click="addComponent2()">onAdd2</button>
        {{ test.num }}
    </div>
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
</template>

<script setup lang="ts">
/**
 * @function toRefs
 */
import { VNode, createVNode, getCurrentInstance, h, nextTick, onMounted, reactive, ref, render, toRefs } from 'vue';
import { useDynamicComponent } from './useDynamic';
import MapDemo from '../../../components-lib/demo/map-demo/MapDemo.vue';
import DynamicSlot from './DynamicSlot.vue';
import ButtonDemo from '../../../components-lib/demo/button-demo/ButtonDemo.vue';
import { ElInput } from 'element-plus';
const refEl = ref<HTMLElement>();
const { useCreateDynamicComponent } = useDynamicComponent();
const key = Symbol(1);
const obj = {num: 1}
const test = reactive(obj);
const t = ref(Array.from({length:5}).map(() => 'wwww'))
const a = reactive([])
const value = ref('jjj')
console.log(getCurrentInstance()?.appContext, getCurrentInstance())
const appContext = getCurrentInstance()?.appContext
function addComponent1() {
    useCreateDynamicComponent({
        key,
        slotParams: {title: 'wtf'},
        appendTo: refEl,
        slotTemplate: DynamicSlot,
        component: MapDemo,
        componentParams: {
            modelValue: value.value,
            'onUpdate:modelValue': (val: string) => {
                console.log('===',val)
                value.value = val
            }
        },
        context: appContext
    })
}
function addComponent2() {
    useCreateDynamicComponent({
        key: Symbol(2),
        appendTo: refEl,
        slotParams: {key: Symbol(2)},
        slotTemplate: DynamicSlot,
        component: ElInput,
        context: appContext,
        componentParams: {
            modelValue: value.value,
            'onUpdate:modelValue': (val: string) => {
                console.log('===',val)
                value.value = val
            }
        },
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