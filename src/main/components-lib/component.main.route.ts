import { RouteRecordRaw } from "vue-router";
import ButtonDemo from "./demo/button-demo/ButtonDemo.vue";
import Demo from "./demo/Demo.vue";
export const componentRoute: RouteRecordRaw[] = [
  {
    path: "demo",
    name: "demo",
    component: Demo,
    children: [
      {
        path: "button",
        component: ButtonDemo,
      },
      {
        path: "select",
        component: ButtonDemo,
      },
    ],
  },
  { path: "", redirect: "/main/component/demo" },
];
