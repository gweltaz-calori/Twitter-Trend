import App from "@/App.vue";

import SocketManager from "@/js/SocketManager";

import Vue from "vue";
import store from "./store/index";

SocketManager.init();

new Vue({
  el: "#app",
  store,
  render: h => h(App)
});
