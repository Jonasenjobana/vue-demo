import { RouteRecordRaw } from "vue-router";
import ButtonDemo from "./demo/button-demo/ButtonDemo.vue";
import Demo from "./demo/Demo.vue";
import MapDemo from "./demo/map-demo/MapDemo.vue";
import ZTableDemo from "./demo/z-table-demo/zTableDemo.vue";
import C from './demo/test/index.vue';
import Webgl1 from "../webgl/webgl1.vue";
import CanvasDemo from "./demo/canvas-demo/canvas-demo.vue";
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
      },
      {
        path: 'GL',
        component: Webgl1
      },
      {
        path: 'Canvas',
        component: CanvasDemo
      },
      {
        path: 'test',
        component: C
      }
    ],
  },
];
