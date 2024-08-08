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
 import { inject, Ref, watch } from 'vue';
import { MenuList } from './menu';
const props = defineProps({
    slotProps: {}
})
const count = inject<Ref<number>>('mainCount')
console.log(props.slotProps)
if (count)
watch(count, (newV: number) => {
    console.log(newV, 'menu provide inject')
})
</script>