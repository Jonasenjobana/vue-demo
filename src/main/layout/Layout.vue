<template>
    <div class="flex flex-col w-full h-screen">
        <div class="w-full h-[60px]">
            <slot name="header"></slot>
        </div>
        <div class="w-full flex-1">
            <slot></slot>
        </div>
        <div class="w-full h-[60px]">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>