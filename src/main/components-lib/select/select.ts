export interface SelectOption {
    label: string,
    value: string,
    children?: SelectOption[]
    hidden?: boolean
    disabled?: boolean
}