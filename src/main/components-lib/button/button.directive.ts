import App from "../../../App.vue"

App.directive('drag', (el: HTMLElement, binding: any) => {
    // 这会在 `mounted` 和 `updated` 时都调用
    el.style.color = binding.value
    console.log('test',el)
  })