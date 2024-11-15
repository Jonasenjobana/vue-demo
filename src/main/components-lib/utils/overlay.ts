import { Component, Ref, ref } from "vue";

interface OverlayElement {
    
}
const GLOBAL_CLASSNAME = 'sl-overlay-container';
// 全局单例
const OVERLAY_CONTAINER: Ref<HTMLElement | null> = ref(null);
function useOverlay(target: Component, append: any) {
    if (!OVERLAY_CONTAINER.value) {
        initOverlayContainer();
    } else {

    }
}
function initOverlayContainer() {
    const div = OVERLAY_CONTAINER.value = document.createElement('div');
    div.className = GLOBAL_CLASSNAME;
    document.body.appendChild(div);
}