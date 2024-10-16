export const ZTableConfigInjectKey = Symbol('config');
export type ZTableColumnType = 'seq' | 'text'
export interface ZTableColumn {
    title: string
    field: string
    type: ZTableColumnType
    width?: number
    renderCell?: Function
}
export interface ZTableConfig {
    columns: Partial<ZTableColumn>[],
    page?: boolean
    treeConfig: any
}