<template>
    <div class="flex flex-column h-full">
        <div class="w-[200px] px-[10px]">
            <ul>
                <li v-for="item in LibMenuList" class="my-[10px] cursor-pointer hover:text-emerald-300">
                    <span @click="toLink(item)">{{ item.title }}</span>
                </li>
            </ul>
        </div>
        <div class="flex-1">
            <RouterView style="height: 100%;width: 100%;"></RouterView>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { HeadMenuItem } from '../layout/menu/menu';
import { LibMenuList } from './lib.menu';

const router = useRouter()
function toLink(item: HeadMenuItem) {
    router.push({ path: item.path })
}
</script>

<style scoped>

</style>