export class ButtonPropsOption {
    readonly tag: string = 'button'
    inType: ButtonType = 'default'
}
export type ButtonType = 'default' | 'primary' | 'warning' | 'danger' | 'success' | 'info' | 'error';