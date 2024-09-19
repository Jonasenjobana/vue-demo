<template>
    <div>
        <layout>
            <template #header="slotProps">
                <app-menu :slot-props="slotProps"></app-menu>
            </template>
            <template #footer>
                <h1>footer</h1>
            </template>
        </layout>
    </div>
</template>

<script setup lang="ts">
import AppMenu from './layout/menu/Menu.vue';
import Layout from './layout/Layout.vue';

</script>

<style scoped>

</style>