import { MaybeRef, PropType, VNode } from "vue"

export interface ZModalConfig {
    title?: string
    showMask?: boolean
    maskClosable?: boolean
    width?: number | string
    height?: number | string
    contentVNode?: () => VNode
    titleVNode?: () => VNode
    footterVNode?: () => VNode
    footerBtns?: ZModalFooterBtn[]
    closeCb?: () => void
    appendTo?: MaybeRef<HTMLElement>
}
export interface _ZModalConfig extends ZModalConfig {
    /**临时生成的mask 会销毁 */
    maskContainer?: MaybeRef<HTMLElement>
}
export const ZModalProps = {
    title: String,
    width: {
        type: [String, Number],
        default: 600
    },
    height: {
        type: [String, Number],
        default: 400
    },
    showMask: {
        type: Boolean,
        default: true
    },
    maskClosable: {
        type: Boolean,
        default: true
    },
    contentVNode: Function as PropType<() => VNode>,
    titleVnode: Function as PropType<() => VNode>,
    footterVnode: Function as PropType<() => VNode>,
    footerBtns: Array as PropType<ZModalFooterBtn[]>,
    closeCb: Function,
    maskContainer: Object as PropType<MaybeRef<HTMLElement>>
}
export interface ZModalFooterBtn {
    label: string;
    type?: string;
    onClick: () => void;
}