import { ComponentObjectPropsOptions } from "vue";

export interface ButtonPropsOption {
    inType?: ButtonType,
    tag?: string,
}
export const ButtonProps: any = {
    inType: {
        type: String as () => ButtonType,
        default: 'default',
    },
    tag: {
        type: String,
        default: 'button',
    }
}
export type ButtonType = 'default' | 'primary' | 'warning' | 'danger' | 'success' | 'info' | 'error';