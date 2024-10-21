import { ExtractPropTypes, Ref, SetupContext, computed, reactive, ref, toRefs, watch } from "vue";
import { ZSelectEmit, ZSelectEmitType, ZSelectOptionItem, ZSelectProps } from "./default";

export const useBaseSelect = (props: ExtractPropTypes<typeof ZSelectProps>, emit: SetupContext<ZSelectEmitType>['emit']) => {
  const inputStatusRef = computed(() => {
    return props.inSearch ? "searchable" : "normal";
  });
  
  const options: Ref<ZSelectOptionItem[]> = ref([]);
  watch(
    () => props.inOptions,
    (val) => {
      if (val.length > 0) {
        if (val[0] instanceof Object) {
          options.value = val as ZSelectOptionItem[];
        } else {
          options.value = val.map((opt) => {
            return {
              label: opt,
              value: opt,
            };
          }) as ZSelectOptionItem[];
        }
      }
      console.log(options.value, props.modelValue, val, "wtf");
    },
    {
      deep: true,
      immediate: true,
    }
  );

  const inputText = computed(() => {
    let text = "";
    if (Array.isArray(props.modelValue)) {
      text = options.value
        .filter((item) => (props.modelValue as Array<string | number>).some((value) => value == item.value))
        .reduce((text, item) => (text == "" ? item.label : text + props.inSplit + item.label), "");
    }
    text = options.value.find((item) => item.value == props.modelValue)?.label || "";
    return text;
  });
  const onSelectChange = (option: ZSelectOptionItem) => {

  }
  return {
    inputStatusRef,
    options,
    inputText,
    onSelectChange
  };
};
