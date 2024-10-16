import { Reactive, reactive } from "vue";

export function useComputedStyle(object: Reactive<any>, keys?: string[]): Reactive<any> {
  const styles = reactive({});
  const keyList = keys || Object.keys(object);
  keyList.forEach((key) => {
    if (typeof object[key] == "string" || typeof object[key] == "number") {
      Object.assign(styles, computedStyleProperty(key, object[key]))
    }
  });
  return styles;
}
export function computedStyleProperty(property: string, value: string | number, unit = "px"): Object {
  if (typeof value == "number") {
    return {
      [property]: `${value}${unit}`,
    };
  }
  const numberValue = parseFloat(value);
  const lastUnitIdx = value.lastIndexOf(numberValue + "");
  if (lastUnitIdx != -1) {
    return {
      [property]: `${value.slice(0, lastUnitIdx)}${value.slice(lastUnitIdx)}`,
    };
  }
  return {};
}
