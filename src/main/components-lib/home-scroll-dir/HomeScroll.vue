<template>
    <div>
        <ElButton @click="start()">开始</ElButton>
        <div style="display: flex;">
            <ScrollNumberItem v-for="v in rotate" style="width: 30px; height: 60px;" :rotate="v"></ScrollNumberItem>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
import ScrollNumberItem from './ScrollNumberItem.vue';
import anime from 'animejs/lib/anime.es.js';
import { nextTick, ref } from 'vue';
const number = ref();
const rotate = ref([]);
let prevAnime = [];
let cache;
function start() {
    number.value = Number((Math.random() * 1000000).toFixed(0));
    const splitArray = rotateNumber(number.value);
    const init = new Array(splitArray.length).fill(0).map((el, idx) => {
        return {
            value: el,
        }
    })
    prevAnime.forEach(an => an.remove())
    console.log(number.value)
    cache = cache || new Array(init.length).fill(0);
    rotate.value = cache;
    prevAnime = init.map((obj, idx) => {
        return new anime(Object.assign({
            targets: obj,
            duration: 1000,
            easing: 'easeInOutExpo',
            autoplay: false,
            update: function () {
                rotate.value[idx] = idx % 2 == 0 ? obj.value : -1 * obj.value - 360 - 72;
            },
            value: function () {
                return splitArray[idx]
            },
            complete: function () {
                idx !== 0 && prevAnime[idx - 1].play();
            }
        }));
    })
    prevAnime[prevAnime.length - 1].play();
    cache = splitArray.map(el => el)
}
function rotateNumber(number: number) {
    return number.toString().split('').map(el => {
        return Number(el) * 36;
    });
}
</script>

<style scoped lang="less">
.target {
    background-color: rgb(238, 226, 226);
    height: 100px;
    width: 100px;
}
</style>