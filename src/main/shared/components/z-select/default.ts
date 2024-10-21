import { PropType } from "vue";
import { UPDATED_MODEL_EVENT } from "../utils/common.utils";

export const ZSelectProps = {
  placeholder: String,
  inOptions: {
    type: Array as PropType<ZSelectOptionItem[] | (string | number)[]>,
    required: true,
    default: () => [],
  },
  modelValue: {
    type: [Array, String, Number],
  },
  inMultiple: Boolean,
  inTree: Boolean,
  inSearch: Boolean,
  inSplit: {
    type: String,
    default: ",",
  },
};
export interface ZSelectOptionItem {
  label: string;
  value: string;
  children?: ZSelectOptionItem[];
  expanded?: boolean;
  disabled?: boolean;
}

export const ZSelectEmit = {
    "onSelectChange": (item: ZSelectOptionItem) => {},
    [UPDATED_MODEL_EVENT]: (val: any) => {},
}
export type ZSelectEmitType = typeof ZSelectEmit ;
