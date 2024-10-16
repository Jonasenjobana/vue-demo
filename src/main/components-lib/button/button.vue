<template>
    <component :is="tag" :class="[ns.b('button'), ns.bm('button', typeRef)]" @click="emit('click', $event)">
        <slot></slot>
    </component>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { useNamespace } from '../utils/namespace.util';
import { ButtonType } from './button';
defineOptions({
    name: 'SlButton'
})
const emit = defineEmits<{
    'click': [event: MouseEvent]
}>()
const ns = useNamespace('sl');
const props = defineProps({
    inType: {
        type: String as PropType<ButtonType>,
        default: 'default',
    },
    tag: {
        type: String,
        default: 'button',
    }
});
const typeRef = computed(() => {
    return props.inType
})


</script>

<style scoped></style>