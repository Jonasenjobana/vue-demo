<template>
    <div class="">
        <ul class="flex align-middle">
            <li v-for="item in MenuList" class="h-[60px] leading-[60px] mx-[20px]">
                <RouterLink :to="item.path" class="px-[10px] py-[5px] bg-cyan-500 text-primary rounded-[5px]"
                    inactive-class="text-gray-700 " active-class="text-red-500">{{ item.title }}</RouterLink>
            </li>
            <li>
                <el-select v-model="value" class="m-2" placeholder="Select">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ElSelect, ElOption } from 'element-plus';

import { MenuList } from './menu';
import { reactive, ref } from 'vue';
const value = ref('')
const options = reactive([
    { value: 'blue', label: '蓝色' },
    { value: 'green', label: '绿色' },
])
</script>