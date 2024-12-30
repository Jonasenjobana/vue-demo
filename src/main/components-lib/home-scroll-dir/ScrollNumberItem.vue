<template>
    <div class="scroll-number-item" ref="itemRef" :style="{'--radius': radius+'px'}">
        <div class="scroll-axis" :style="{transform: `rotateX(${-1 * Number(rotate) || Number(value) * -36}deg)`}">
            <div :class="`scroll-number${i-1}`" v-for="i in 10" :key="i-1">{{ i-1 }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

defineProps({
    value: [Number, String],
    rotate: [Number, String],
})
const itemRef = ref<HTMLElement>();
const radius = ref(0);
onMounted(() => {
    const {height} = itemRef.value.getBoundingClientRect();
    radius.value = height/2/Math.tan(18 * (Math.PI / 180));
})

</script>

<style scoped lang="less">
.scroll-number-item {
    padding: 2px;
    overflow: hidden;
    transform-style: preserve-3d;
}

.scroll-axis {
    transform-style: preserve-3d;
    transform-origin: center center var(--radius);
    position: relative;
    height: 100%;
}

each(range(0, 9), {
    .scroll-number@{value} {
        border: 1px solid #333;
        transform-origin: center center var(--radius);
        transform: rotateX(@value * 36deg);
        font-size: 28px;
        align-items: center;
        backface-visibility: hidden;
        justify-content: center;
        display: flex;
        position: absolute;
        height: 100%;
        width: 100%;
    }
})
</style>