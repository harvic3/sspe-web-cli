import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueSocketio from "vue-socket.io-extended";
import io from "socket.io-client";

Vue.use(VueSocketio, io(store.state.wsUrl, 
  { transports: [
      "polling",
      "websocket"
    ],
    path: "/stomp"
  }),
  {
    store: store,
  }
);

Vue.config.productionTip = store.state.env === "PROD" ? true : false;

new Vue({
  store: store,
  render: h => h(App)
}).$mount("#app");
