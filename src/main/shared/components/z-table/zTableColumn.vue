<template>
    <div>
    </div>
</template>

<script setup lang="ts">
import { PropType, Reactive, computed, getCurrentInstance, h, inject, onBeforeMount, onMounted, unref, useSlots } from 'vue';
import { ZTableColumnType, ZTableConfig } from './zTable.model';
import { useRender } from './zRender';
const props = defineProps({
    field: String,
    title: String,
    type: {
        type: String as PropType<ZTableColumnType>,
        default: 'text',
    },
    width: Number,
    data: Array
})
const slots = useSlots();
const zTableConfig = inject('$zTableConfig');
onBeforeMount(() => {
    const slotNode = slots.default?.();
    const { renderCell } = useRender(props, slots);
    
    if (zTableConfig) {
        (zTableConfig as Reactive<ZTableConfig>).columns.push({ ...props, renderCell });
    }
})
onMounted(() => {
})
</script>

<style scoped></style>