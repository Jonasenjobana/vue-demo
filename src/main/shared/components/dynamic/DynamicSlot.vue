<template>
    <div class="dynamic-slot">
        <div class="head">
            <div>{{ title }}</div>
        </div>
        <div class="content-slot">
            <slot :params="params"></slot>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: String,
    params: Object
})
</script>

<style scoped>
    .head {
        height: 60px;
    }
    .dynamic-slot {
        height: 100%;
        width: 100%;
        flex-direction: column;
        display: flex;
    }
    .content-slot {
        flex: 1;
    }
</style>