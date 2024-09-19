import { Ref, unref } from "vue";

export function useElEvent(element: Ref<HTMLElement> | HTMLElement, eventName: string, handler: EventListenerOrEventListenerObject) {
  const el = unref(element);
  if (!el) return;
  el.addEventListener(eventName, handler);
  const remove = () => {
    el.removeEventListener(eventName, handler);
  };
  return remove;
}
