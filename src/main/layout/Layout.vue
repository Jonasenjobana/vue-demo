<template>
    <div class="flex flex-col w-full h-screen">
        <div class="w-full h-[60px]">
            <slot name="header" :header="'hgeadeawd'"></slot>
        </div>
        <div class="w-full flex-1">
            <RouterView></RouterView>
        </div>
        <div class="w-full h-[60px]">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, provide, ref, Ref, watch } from 'vue';
const count = inject<Ref<number>>('mainCount')
const count2 = ref(0);
provide('mainCount', count2)

if (count)
    watch(count, (newV: number) => {
        console.log(newV, 'count change provide inject')

    })
</script>