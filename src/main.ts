import { createApp } from "vue";
import App from "./app/App.vue";
import "./app/index.css";

import { store, key } from "./app/store";

createApp(App).use(store, key).mount("#app");
