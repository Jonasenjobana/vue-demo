import { defineComponent } from "vue";
import { ZTableConfigInjectKey } from "../zTable.model";

export default defineComponent({
    name: 'ZTable',
    props: {
        data: Array<any>
    },
    provide: {
        tableConfig: ZTableConfigInjectKey
    },
})