import { RouteRecordRaw } from "vue-router";
import ComponentMain from "./components-lib/ComponentMain.vue";
import { componentRoute } from "./components-lib/component.main.route";
export const mainRoute: RouteRecordRaw[] = [
  { path: "component", component: ComponentMain, children: componentRoute },
  { path: "", redirect: "/main/component" },
  // { path: "/map"}
];
