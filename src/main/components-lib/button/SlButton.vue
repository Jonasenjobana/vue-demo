<template>
    <component :is="tag" :class="[ns.b('button'), ns.bm('button', typeRef)]">
    </component>
    <!-- <button :class="[ns.b('button'), ns.bm('button', typeRef)]">test</button> -->
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, watch, watchPostEffect, watchSyncEffect } from 'vue';
import { useNamespace } from '../utils/namespace.util';
const ns = useNamespace('sl');
const props = defineProps({
    inType: {
        type: String,
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
const instance = getCurrentInstance();

</script>

<style scoped></style>