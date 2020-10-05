import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGtag from "vue-gtag-next";

import "./assets/index.css";

createApp(App)
  .use(router)
  .use(
    VueGtag,
    {
      config: { id: "UA-285785-15" },
    },
    router
  )
  .mount("#app");
