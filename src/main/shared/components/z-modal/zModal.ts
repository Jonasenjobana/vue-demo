import { MaybeRef, Ref, createApp, createVNode, getCurrentInstance, h, nextTick, onMounted, reactive, ref, render, unref } from "vue";
import { ZModalConfig } from "./default";
import ZModal from "./zModal.vue";
export const ZModalMaskContainer: Ref<HTMLElement | undefined> = ref();
/**
 * 创建遮罩层容器
 * 父级等同大小
 */
export function createMaskContainer(parent?: MaybeRef<HTMLElement | undefined>) {
  const maskContainer = document.createElement("div");
  const parentEl = unref(parent);
  if (parentEl) {
    parentEl.style.position = "relative";
    maskContainer.style.position = "absolute";
    maskContainer.style.width = "100%";
    maskContainer.style.height = "100%";
    maskContainer.style.top = "0";
    maskContainer.style.left = "0";
  } else {
    maskContainer.style.position = "fixed";
    maskContainer.style.width = "100%";
    maskContainer.style.height = "100%";
    maskContainer.style.top = "0";
    maskContainer.style.left = "0";
  }
  return maskContainer;
}
export function useZModal(modalConfig: ZModalConfig) {
  const onClose = ref();
  const onOpen = ref();
  nextTick(() => {
    const { appendTo } = modalConfig;
    const appendEl = unref(appendTo);
    const container = createMaskContainer(appendEl);
    if (appendEl) {
      appendEl.appendChild(container);
    } else {
      if (!ZModalMaskContainer.value) {
        ZModalMaskContainer.value = document.createElement('div');
        document.body.appendChild(ZModalMaskContainer.value);
      }
      ZModalMaskContainer.value.appendChild(container);
    }
    const vm = createVNode(
      ZModal,
      {
        ...modalConfig,
        maskContainer: container,
      },
      {
        default: modalConfig.contentVNode,
        title: modalConfig.titleVNode,
        footer: modalConfig.footterVNode,
        content: modalConfig.contentVNode,
      }
    )
    render(vm, container);
    onClose.value = vm.component?.exposed?.onClose,
    onOpen.value = vm.component?.exposed?.onOpen
  })
  return {
    onClose,
    onOpen
  };
}
