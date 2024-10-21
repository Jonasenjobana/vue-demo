<script lang="ts">
import { PropType, computed, defineComponent, h, reactive, ref, toRefs, watch } from "vue";
import { ZSelectEmit, ZSelectOptionItem, ZSelectProps } from "./default";
import './z-select.less';
import { useBaseSelect } from "./useSelect";
import { UPDATED_MODEL_EVENT } from "../utils/common.utils";
export default defineComponent({
    name: 'ZSelect',
    props: {
        ...ZSelectProps
    },
    emits: [
        "onSelectChange",
        UPDATED_MODEL_EVENT
    ],
    setup(props, { slots, emit }) {
        const modelValue = computed(() => {
            const { modelValue: rawModelValue, inMultiple, inSplit } = props;
            if (inMultiple && !Array.isArray(rawModelValue) && typeof rawModelValue == 'string') {
                return rawModelValue.split(inSplit);
            }
            return rawModelValue;
        })
        const _props = reactive({
            ...toRefs(props),
            modelValue
        })
        const { inputStatusRef, inputText, options } = useBaseSelect(_props, emit);
        return () => {
            return h('div', {
                class: 'z-select',
            }, [
                h('div', {
                    class: 'z-select-input-wrap'
                }, [
                    h('input', {
                        class: `z-select-input ${inputStatusRef.value}`,
                        value: inputText.value,
                    })
                ]),
                options.value.map((option) => h('div', {
                    class: 'z-select-item', onClick: () => {
                        console.log(option)
                        emit('update:modelValue', option.value);
                    }
                }, option.label))
            ])
        }
    }
})
</script>