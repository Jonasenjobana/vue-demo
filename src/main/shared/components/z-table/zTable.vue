<template>
    <div class="z-table">
        <div class="z-table-slot">
            <slot :data="data"></slot>
        </div>
        <div class="z-table-head">
            <table>
                <colgroup>
                    <col v-for="column in columns" :width="column.width">
                </colgroup>
                <thead>
                    <tr>
                        <td v-for="column in columns">{{ column.title }}</td>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="z-table-content">
            <table>
                <colgroup>
                    <col v-for="column in columns" :width="column.width">
                </colgroup>
                <z-table-body :columns="columns" :data="data"></z-table-body>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType, computed, onMounted, provide, reactive, ref, useSlots, watch } from 'vue';
import { ZTableConfig } from './zTable.model';
import ZTableBody from './zTableBody'
defineProps({
    data: {
        type: Array as PropType<any[]>,
        default: []
    },
})
const config = reactive<ZTableConfig>({
    columns: [],
    treeConfig: {}
})
provide('$zTableConfig', config)
const columns = computed(() => {
    return config.columns
})
</script>

<style scoped>
    .z-table {
        width: 100%;
    }
</style>