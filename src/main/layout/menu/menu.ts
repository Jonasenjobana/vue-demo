export interface HeadMenuItem {
    title: string
    path: string
    menuCode?: string
    children?: HeadMenuItem[]
}
export const MenuList: HeadMenuItem[] = [
    {
        title: '组件库',
        path: '/main/components-library',
    },
    {
        title: '地图',
        path: '/main/map'
    },
    {
        title: '3D',
        path: '/main/3d'
    }
]