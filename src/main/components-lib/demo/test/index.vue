<template>
  <div class="c-select-container" ref="select-container">
    <div class="select-dropdown_trigger">
      {{ ifShow }}
      <el-input type="text" readonly v-model="inputValue" ref="triggerhandle" @click="clickinput()">
        <template #suffix>
          <!-- <el-icon class="arrowdown"><ArrowDown /></el-icon> -->
          <!-- <el-icon class="close" @click="inputValue = ''"><Close /></el-icon> -->
        </template>
      </el-input>
      <transition name="el-zoom-in-center">
        <ul v-show="ifShow" class="select-dropdown_list" ref="drowdown">
          <li
            v-for="i in options"
            :key="i.uuid"
            :class="['select-dropdown_item', { 'select-dropdown_item_active': inputValue === i.label }]"
            @click.prevent.stop="onChange(i)"
          >
            <span>{{ i.label }}</span>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue"
defineOptions({
  name: "cSelect"
})
interface ICSelect<T> {
  label: string
  value: T
  disabled?: boolean
  children?: ICSelect<T>[]
  uuid: string
}
const options = ref([{
  label: "1",
  value: 1,
  uuid: "1"
}, {
  label: "2",
  value: 2,
  uuid: "2"
}, {
  label: "3",
  value: 3,
  uuid: "3"
}])
const ifShow = ref(false)
function clickinput() {
  ifShow.value = !ifShow.value;
  if (ifShow.value) {
    document.body.addEventListener("click", listenerCb)
  } else {
    document.body.removeEventListener("click", listenerCb)
  }
}
const inputValue = ref<number | string>("")
const drowdown = ref()
const triggerhandle = ref<HTMLUListElement>()
const arrowDownDisplay = computed(() => (ifShow.value ? "none" : "inline-block"))
const closeDisplay = computed(() => (ifShow.value ? "inline-block" : "none"))
// const props = defineProps({
//   options: {
//     required: true,
//     type: Array<ICSelect<any>>,
//     default: () => []
//   },
// })
// watchEffect(async () => {
//   // await nextTick()
//   console.log(ifShow.value, "ifShow.value")
//   if (ifShow.value) {
//     await nextTick()
//     setTimeout(() => document.body.addEventListener("click", listenerCb))
//   } else {
//     await nextTick()
//     document.body.removeEventListener("click", listenerCb)
//   }
// })
watch(ifShow, (value) => {
  // if (value) {
  //   document.body.addEventListener("click", listenerCb)
  // } else {
  //   document.body.removeEventListener("click", listenerCb)
  // }
})
const listenerCb = (e: MouseEvent) => {
  if (!drowdown.value.contains(e.target as HTMLElement)) {
    console.log('www', ifShow.value)
    // ifShow.value = false
    // document.body.removeEventListener("click", listenerCb)
  }
}
const onChange = (item: ICSelect<any>) => {
  inputValue.value = item.label
  ifShow.value = false
}
</script>
<style scoped lang="less">
.c-select-container {
  position: relative;
}
.select-dropdown_trigger {
  min-width: 100px;
  width: 300px;
  position: relative;
  .el-input {
    width: 100%;
    .arrowdown {
      cursor: pointer;
      display: v-bind(arrowDownDisplay);
    }
    .close {
      cursor: pointer;
      display: v-bind(closeDisplay);
    }
    &:hover {
      .close {
        display: inline-block;
      }
      .arrowdown {
        display: none;
      }
    }
  }
}
.select-dropdown_list {
  padding: 6px 0;
  margin: 0;
  list-style: none;
  background-color: #f5f7fa;
  position: absolute;
  top: 37px; // 32 + margin-top 5
  left: 0;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  width: 300px;
  &::before {
    content: "";
    position: absolute;
    top: -6px;
    left: 50%;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #f5f7fa;
  }
  .select-dropdown_item {
    height: 34px;
    line-height: 34px;
    cursor: pointer;
    padding-right: 32px;
    padding-left: 20px;
    color: #333;
    &_active {
      color: #409eff;
      background-color: #e4e7ed;
    }
    &:hover {
      background-color: #e4e7ed;
    }
  }
}
.select-dropdown_grobal {
  width: 100%;
}
</style>
