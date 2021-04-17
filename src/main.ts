import { createApp } from "vue";
import App from "./App.vue";

import { store, key } from "./app/store";

createApp(App).use(store, key).mount("#app");
