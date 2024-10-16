<template>
    <sl-button :in-type="'danger'" @click="onClick($event)">
        {{ total }}
    </sl-button>
    {{ totalComputed }}
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue';
import SlButton from '../../button/button.vue';
const total = ref(0);
const instance = getCurrentInstance();
console.log(instance);
function onClick(e: any) {
    total.value++;
}
const totalComputed = computed(() => {
    return total.value + 'change'
})
</script>

<style scoped></style>