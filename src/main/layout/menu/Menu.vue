<template>
    <div class="">
        <ul class="flex align-middle">
            <li v-for="item in MenuList" class="h-[60px] leading-[60px] mx-[20px]">
                <RouterLink :to="item.path" class="px-[10px] py-[5px] bg-cyan-500 text-white rounded-[5px]"
                    inactive-class="text-gray-700 " active-class="text-red-500">{{ item.title }}</RouterLink>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { MenuList } from './menu';
</script>