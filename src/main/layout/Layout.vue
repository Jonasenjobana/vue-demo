<template>
    <div class="layout">
        <div class="header">
            <slot name="header"></slot>
        </div>
        <div class="content">
            <slot></slot>
        </div>
        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
    .layout {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        & > .header {
            width: 100%;
            height: 60px;
            display: flex;
        }
        .content {
            flex: 1;
            width: 100%;
        }
        .footer {
            width: 100%;
            height: 60px;
        }
    }
</style>