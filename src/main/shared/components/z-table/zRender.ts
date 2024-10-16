import { SetupContext, Slot, h } from "vue";
import { ZTableColumn } from "./zTable.model";

export function useRender(props: any, slots: SetupContext['slots']) {
    const renderCell = (col: ZTableColumn, row: any) => {
        const cellProp = {
            class: 'cell'
        };
        const children = slots.default?.({
            row, col
        });
        return h('div', cellProp, children ? children : h('span', {
            class: 'cell-span',
        }, [row[col.field]]))
    }
    return {
        renderCell
    }
}