import { RouteRecordRaw } from "vue-router";
import Button from "./button/Button.vue";
import SlSelect from "./select/AppSelect.vue";
export const componentRoute: RouteRecordRaw[] = [
    { path: "select", name: "sl-select", component: SlSelect },
    { path: "button", name: "Components", component: Button },
    { path: '', redirect: '/main/components-library/button' },
  ];
  