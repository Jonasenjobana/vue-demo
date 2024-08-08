<template>
    <div>
        Test
        <input type="text" v-model="msg">
    </div>
    <p>-----------------default slot-----------------</p>
    <slot></slot>
    <p>{{ msg }}</p>
    <slot name="nameSlot"></slot>
</template>

<script setup lang="ts">
import { getCurrentInstance, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
const props = defineProps({
    msg: {
        type: String,
        default: 'hello',
        required: true,
        validator: (value: string) => {
            return value.length > 0
        }
    }
})
const msg = ref<string>(props.msg)
const title = reactive(msg)
const emit = defineEmits(['masChange', 'nothing'])
watch(msg, (newV: string, oldV: string) => {
    emit('masChange', newV)
})
onMounted(() => {
    console.log('mounted')
})
onUnmounted(() => {
    console.log('destory')
})
console.log(props.msg, 'damn', getCurrentInstance(), this)
</script>

<style scoped></style>