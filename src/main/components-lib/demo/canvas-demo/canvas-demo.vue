<template>
    <div>
        <canvas ref="canvasRef"></canvas>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, unref } from 'vue';
const canvasRef = ref<HTMLCanvasElement>();
const ctxRef = ref<CanvasRenderingContext2D >();
const img = new Image();
img.src = '/direction-arrow.png'
onMounted(() => {
  const el = canvasRef.value;
  const {width, height} = el.getBoundingClientRect();
  ctxRef.value = el.getContext('2d');
  el.width = width;
  el.height = height;
  animate();
})
let animeFlag
const animate = () => {
    animeFlag && cancelAnimationFrame(animeFlag);
    let prevTime = 0;
    const draw = (timeStamp?: number) => {
        prevTime = prevTime || 0;
        console.log(prevTime, timeStamp)
        if (timeStamp - prevTime >= 1000 / 60 || !timeStamp) {
            clear();
            drawLine();
            console.log(prevOffset)
            prevOffset = prevOffset+1 <= 20 ? prevOffset + 1 : 0;
            animeFlag = requestAnimationFrame((time) => {
                draw(time);
            });
        }
    }
    draw();
}
function clear() {
    const ctx = unref(ctxRef);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
let prevOffset = 0;
function drawLine() {
    const ctx = unref(ctxRef);
    
    ctx.moveTo(50, 50);
    ctx.save();
    // 50 50 200 200 中点
    const degree = computeDegree(50, 50, 200, 200);
    ctx.rotate(degree);
    ctx.translate(prevOffset+1, 0)
    const strokeWidth = 10;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = strokeWidth;
    const ctx2 = canvas.getContext('2d');
    ctx2.drawImage(img, 0, 0, strokeWidth, strokeWidth)
    const pattern = ctx.createPattern(canvas, 'repeat');
    const matrix = new DOMMatrix();
    matrix.rotateSelf(90);
    matrix.translateSelf(5, 5);
    pattern.setTransform(matrix)
    ctx.strokeStyle = pattern
    ctx.lineWidth = 10;
    ctx.stroke()
    ctx.restore();
    ctx.lineTo(200, 200);

    // ctx.translate(0, prevOffset-1)
    // ctx.rotate(-Math.PI)
}
function computeDegree(x0: number, y0: number, x1: number, y1: number) {
    const dx = x1 - x0;
    const dy = y1 - y0;
    return Math.atan2(dy, dx);
}
</script>

<style scoped lang="less">
 div, canvas {
    height: 100%;
    width: 100%;
 }
</style>