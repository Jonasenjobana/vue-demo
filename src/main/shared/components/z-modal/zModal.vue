<template>
    <div class="z-modal-container" :class="{ 'z-modal-mask': showMask }">
        <div class="z-modal" :style="modalStyle">
            <div class="z-modal-head" @click="onClose()">
                <span>{{ title }}</span>
                <slot name="title"></slot>
            </div>
            <div class="z-modal-content">
                <slot v-if="!$slots.content"></slot>
                <slot name="content"></slot>
            </div>
            <div class="z-modal-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useComputedStyle } from '../../utils/style.utils';
import { ZModalProps } from './default';
const props = defineProps({
    ...ZModalProps,
  
})
const modalStyle = useComputedStyle(props, ['width', 'height']);
const emit = defineEmits(['close'])
const onClose = () => {
    props.closeCb?.();
    emit('close');
}
defineExpose({
    onClose
})
</script>

<style scoped lang="less">
.z-modal-container {
    z-index: 9999;
    &.z-modal-mask {
        height: 100%;
        width: 100%;
        background-color: #0000001a;
    }
    .z-modal {
        background-color: #fff;
    }
}
</style>