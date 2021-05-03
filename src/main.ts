import { createApp } from "vue";
import App from "./core/app/App.vue";
import "./core/app/index.css";

import { store, key } from "./core/app/store";

createApp(App).use(store, key).mount("#app");
