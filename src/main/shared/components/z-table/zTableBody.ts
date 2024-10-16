import { PropType, createCommentVNode, defineComponent, h } from "vue";
import { ZTableColumn } from "./zTable.model";

export default defineComponent({
  name: "zTableBody",
  props: {
    columns: Array as PropType<Partial<ZTableColumn>[]>,
    data: Array,
  },
  setup(props) {},
  render() {
    const { columns, data = [] } = this;
    return h(
      "tbody",
      {
        class: "z-tbody",
      },
      data!.map((row) => {
        return h(
          "tr",
          {
            class: "z-tbody-tr",
          },
          columns?.map((col) =>
            h(
              "td",
              {
                class: "z-body-td",
              },
              col.renderCell && col && row ? col.renderCell(col, row) : createCommentVNode()
            )
          )
        );
      })
    );
  },
});
