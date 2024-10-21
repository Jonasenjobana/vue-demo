import { RouteRecordRaw } from "vue-router";
import ButtonDemo from "./demo/button-demo/ButtonDemo.vue";
import Demo from "./demo/Demo.vue";
import MapDemo from "./demo/map-demo/MapDemo.vue";
import ZTableDemo from "./demo/z-table-demo/zTableDemo.vue";
export const componentRoute: RouteRecordRaw[] = [
  { path: "", redirect: "/main/component/demo/table" },
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
      {
        path: 'map',
        component: MapDemo
      },
      {
        path: 'table',
        component: ZTableDemo
      }
    ],
  },
];
