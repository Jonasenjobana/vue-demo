<template>
    <z-table :data="data">
        <z-table-column :type="'seq'" title="序号" :width="60"></z-table-column>
        <z-table-column title="id" field="id" :width="120"></z-table-column>
        <z-table-column title="名称" field="title" :width="200">
            <template #default="dd">
                <sl-button :in-type="'default'" @click="clickBtn(dd)">详细</sl-button>
                <sl-button :in-type="'default'" @click="del()">删除</sl-button>
            </template>
        </z-table-column>
    </z-table>
    <div ref="divEl" style="width: 200px; height: 200px;">
    </div>
    <!-- <z-select :in-options="opt" v-model="selectModel">
    </z-select> -->
    <layout-dynamic></layout-dynamic>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import zTable from '../../../shared/components/z-table/zTable.vue';
import ZTableColumn from '../../../shared/components/z-table/zTableColumn.vue';
import SlButton from '../../button/button.vue';
import ZSelect from '../../../shared/components/z-select/ZSelect.vue';
import { useZModal } from '../../../shared/components/z-modal/zModal';
import layoutDynamic from '../../../shared/components/dynamic/layout-dynamic.vue';
defineExpose({
    name: 'ZTableDemo'
})
const opt = ref(['bananan', 'apple', 'pear']);
const selectModel = ref('bananan')
const time = ref(1)
setInterval(() => {
    time.value++
}, 500)
const btnName = ref('ww')
const divEl = ref();
const { onClose, onOpen } = useZModal({
    title: '测试',
    contentVNode: () => h(SlButton, {
        inType: 'default',
        onClick: () => {
            console.log('click')
        }
    }, {
        default: () => `${btnName.value}${time.value}`
    }),
    closeCb: () => {
        console.log('close', data)
    },
    width: '100%',
    height: '100px',
    appendTo: divEl,
    showMask: true
})
function clickBtn(dd: any) {
    console.log(dd)
    onOpen.value();
    opt.value = ['bananan222', 'apple22', 'pear22']
}
function del() {
    onClose.value();
}
const data = ref([
    {
        id: 'abdwioaw',
        title: '测试'
    },
    {
        id: '12312412',
        title: '测试2'
    },
])

</script>

<style scoped></style>