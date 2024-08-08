import { componentRoute } from "./components-lib/component.main.route";
import ComponentMain from "./components-lib/ComponentMain.vue";
export const mainRoute = [
  // { path: '/hello', component: HelloWorld },
  { path: "components-library", component: ComponentMain, children: componentRoute },
];
