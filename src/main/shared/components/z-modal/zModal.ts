import { MaybeRef, createApp, createVNode, getCurrentInstance, h, reactive, ref, render, unref } from "vue";
import { ZModalConfig } from "./default";
import ZModal from "./zModal.vue";
/**
 * 创建遮罩层容器
 * 父级等同大小
 */
export function createMaskContainer(parent?: MaybeRef<HTMLElement | undefined>) {
  const maskContainer = document.createElement("div");
  const parentEl = unref(parent);
  if (parentEl) {
    parentEl.style.position = "relative";
    parentEl.appendChild(maskContainer);
    maskContainer.style.position = "absolute";
    maskContainer.style.width = "100%";
    maskContainer.style.height = "100%";
    maskContainer.style.top = "0";
    maskContainer.style.left = "0";
  } else {
    document.body.appendChild(maskContainer);
    maskContainer.style.position = "fixed";
    maskContainer.style.width = "100%";
    maskContainer.style.height = "100%";
    maskContainer.style.top = "0";
    maskContainer.style.left = "0";
  }
  return maskContainer;
}
export function useZModal(modalConfig: ZModalConfig) {
  const { appendTo } = modalConfig;
  const modalRef = ref();
  const container = createMaskContainer(appendTo);
  const modalNode = reactive(
    createVNode(
      ZModal,
      {
        ...modalConfig
      },
      {
        default: modalConfig.contentVNode,
        title: modalConfig.titleVNode,
        footer: modalConfig.footterVNode,
        content: modalConfig.contentVNode,
      }
    )
  );
  render(modalNode, container);
  console.log(modalNode.component, modalRef.value);
  return {
    modalRef,
  };
}
