<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from 'vue';
import Test from './Test.vue';
const msg = ref('hello vue');
const testRef = ref();
onMounted(() => {
  setTimeout(() => {
    console.log(testRef,'testref');

  }, 100);
  setTimeout(() => {
    console.log(getCurrentInstance(),'current')
  }, 3000);
})
requesetAnmitionFrame(
  () => {
    console.log('new feat')
  }
)
</script>

<template>
  <component :is="Test"></component>
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
