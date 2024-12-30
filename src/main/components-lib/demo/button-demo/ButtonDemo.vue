<template>
    <HomeScroll></HomeScroll>
    <!-- <sl-button :in-type="'danger'" @click="onClick($event)"> -->
        <!-- {{ total }} -->
    <!-- </sl-button> -->
    <!-- <el-input v-model="total"></el-input> -->
    <!-- <sl-input ref="slInputRef" v-model.trim="total" @update:model-value="change($event)"></sl-input> -->
    <!-- {{ totalComputed }} -->
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref, watch } from 'vue';
import HomeScroll from '../../home-scroll-dir/HomeScroll.vue';
import SlButton from '../../button/button.vue';
import ElInput from 'element-plus';
import SlInput from '../../input/sl-input.vue';
const slInputRef = ref();
const total = ref('');
const instance = getCurrentInstance();
console.log(instance);
function onClick(e: any) {
    // total.value++;
}
function change(e: any) {
    console.log(e, slInputRef.value)
}
const totalComputed = computed(() => {
    return total.value + 'change'
})
let a = 1
setInterval(() => {
    a = Math.random();
}, 1000)
watch(() => a, () => {
    console.log(a,'changes');
})
</script>

<style scoped></style>