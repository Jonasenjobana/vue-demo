<template>
    <div class="sl-input-container">
        <input type="text" ref="inputRef" @input="changeInput($event)">
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, h, nextTick, ref, watch } from 'vue';
export default defineComponent({
    name: 'SlInput',
    props: {
        modelValue: [String, Number],
    },
    emits: ['update:modelValue'],

    setup(props, {emit}) {
        const value = ref();
        const inputRef = ref();
        const nativeValue = computed(() => {
            console.log('parent', props.modelValue)
            return props.modelValue
        });
        async function changeInput($event) {
            emit("update:modelValue", $event.target.value);
            console.log(props.modelValue, $event.target.value, 'before nexttick')
            await nextTick();
            console.log(props.modelValue,$event.target.value, 'after nexttick')
            setInputValue();
        }
        const setInputValue = () => {
            const input = inputRef.value
            input.value = nativeValue.value
        } 
        return {
            value,
            changeInput,
            inputRef
        }
    }
}
)
</script>

<style scoped lang="less">
.sl-input-container {
    &:hover {
        border-color: #409eff;
    }
}
</style>