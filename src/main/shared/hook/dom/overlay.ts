import { MaybeRef, VNode } from "vue";

export interface OverlayOptions {
    target: VNode | MaybeRef<HTMLElement>,
    appendTo: MaybeRef<HTMLElement>,
    /**连接target 附着点 */
    connectOrgin: string[],
    /**面板与附着点 连接位置 */
    panelOrgin: string[],
    onOpen: () => void,
    onClose: () => void,
}
export function useOverlay() {

}