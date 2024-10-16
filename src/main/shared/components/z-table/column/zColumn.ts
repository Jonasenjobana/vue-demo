import { PropType, defineComponent, h } from "vue";
import { ZTableColumnType, ZTableConfigInjectKey } from "../zTable.model";

export default defineComponent({
    name: 'ZTableColumn',
    props: {
        title: String,
        field: String,
        type: String as PropType<ZTableColumnType>,
        width: [Number, String]
    },
    inject: {
        tableConfig: ZTableConfigInjectKey
    },
    setup() {
        return h('div', []);
    }
})