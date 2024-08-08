<script setup lang="ts">
import layout from './main/layout/Layout.vue';
</script>

<template>
  <layout>
    <template #header>
      <RouterLink to="/hello" class=" text-sm text-blue-400">Go to Home</RouterLink>
    </template>
    <template #default>
      <RouterView></RouterView>
    </template>
    <template #footer>
      <h1>footer</h1>
    </template>
  </layout>
  <div>
  </div>
</template>

<style scoped></style>
