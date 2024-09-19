import ComponentMain from "./components-lib/ComponentMain.vue";
import { componentRoute } from "./components-lib/component.main.route";
export const mainRoute = [
  { path: "component", component: ComponentMain, children: componentRoute },
  { path: "", redirect: "/main" },
  // { path: "/map"}
];
