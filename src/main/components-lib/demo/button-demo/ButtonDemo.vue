<template>
    <sl-button :in-type="typeRef"></sl-button>
</template>

<script setup lang="ts">
import { getCurrentInstance, nextTick, ref } from 'vue';
import SlButton from '../../button/SlButton.vue';
import { ButtonType } from '../../button/button';
const typeRef = ref<ButtonType>('default')
setInterval(() => {
    const r = Math.random();
    typeRef.value = r < .2 ? 'default' : r > 0.3 ? 'danger' : r > .5 ? 'error' : r > .6 ? 'info' : r > .8 ? 'primary' : 'success';
    nextTick(() => {
        console.log(instance, getCurrentInstance());
    });
}, 1000)
const instance = getCurrentInstance();
console.log(instance);

</script>

<style scoped></style>