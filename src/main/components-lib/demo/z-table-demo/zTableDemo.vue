<template>
    <z-table :data="data">
        <z-table-column :type="'seq'" title="序号" :width="60"></z-table-column>
        <z-table-column title="id" field="id" :width="120"></z-table-column>
        <z-table-column title="名称" field="title" :width="200">
            <template #default="dd">
                <sl-button :in-type="'default'" @click="clickBtn()">详细</sl-button>
            </template>
        </z-table-column>
    </z-table>
    <div ref="divEl" style="width: 200px; height: 200px;">

    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, h, ref, watch } from 'vue';
import zTable from '../../../shared/components/z-table/zTable.vue';
import ZTableColumn from '../../../shared/components/z-table/zTableColumn.vue';
import SlButton from '../../button/button.vue';
import { useZModal } from '../../../shared/components/z-modal/zModal';
defineExpose({
    name: 'ZTableDemo'
})
const time = ref(1)
setInterval(() => {
    time.value++
}, 2000)
const divEl = ref()
function clickBtn() {
    const {modalRef} = useZModal({
        title: '测试',
        contentVNode: () => h('span', `这是测试弹框${time.value}`),
        closeCb: () => {
            console.log('close', data)
        },
        width: '100%',
        height: '100px',
        appendTo: divEl,
        showMask: true
    })
    watch(modalRef, (newVal) => {
        console.log(newVal)
    })
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