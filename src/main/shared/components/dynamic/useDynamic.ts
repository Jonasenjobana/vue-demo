import { MaybeRef, Ref, VNode, createVNode, h, nextTick, onMounted, ref, render, toRefs, unref } from "vue";
import DynamicSlot from "./DynamicSlot.vue";
import MapDemo from "../../../components-lib/demo/map-demo/MapDemo.vue";

export interface DynamicComponent {
  appendTo: MaybeRef<HTMLElement | undefined>;
  slotTemplate: any;
  slotParams?: any;
  component: any;
  key: string | Symbol;
  componentParams?: any;
  position?: {
    x: number;
    y: number;
  };
}
export function useDynamicComponent() {
  const allVNode: VNode[] = []
  const componentMap: WeakMap<any, VNode[]> = new WeakMap();
  const useCreateDynamicComponent = (dynamicComponent: DynamicComponent) => {
    const { slotTemplate, slotParams = {}, component, componentParams = {}, key, appendTo } = dynamicComponent;
    const slotComponent = ref<VNode>();
    if (componentMap.has(component)) {
      slotComponent.value = componentMap.get(component)?.find((item) => {
        return item.key === dynamicComponent.key;
      });
    } else {
      componentMap.set(component, []);
    }
    if (!slotComponent.value) {
      slotComponent.value = createVNode(component, { ...componentParams });
      slotComponent.value.key = key as PropertyKey;
      componentMap.get(component)!.push(slotComponent.value);
    }
    const vn = createVNode(
      slotTemplate,
      {
        ...slotParams,
      },
      () => {
        return [slotComponent.value];
      }
    );
    allVNode.push(vn);
    vn.key = key as PropertyKey;
    console.log(vn, componentMap, allVNode);
    const appendEl = unref(appendTo);
    if (!appendEl) return;
    render(
      h("fragment", [...allVNode]),
      appendEl
    );
    const onClose = () => {
      vn?.el!.remove();
      console.log("close");
    };
    const onHidden = () => {};
    const onRefresh = () => {};
    return {
      onClose,
      onHidden,
      onRefresh,
    };
  };
  return {
    useCreateDynamicComponent,
  };
}
