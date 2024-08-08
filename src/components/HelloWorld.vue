<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Test from './Test.vue';
const msg = ref('hello vue');
const testRef = ref();
onMounted(() => {
  setTimeout(() => {
    console.log(testRef);

  }, 100);
})
</script>

<template>
  <Test :msg="msg" @nothing="console.log('wtf')" @mas-change="console.log($event, 'msg-change')" :ref="testRef">
    <h1>default slot</h1>
    <template #nameSlot>
      <div>
        name xixi
      </div>
    </template>
  </Test>
</template>

<style scoped>
</style>
