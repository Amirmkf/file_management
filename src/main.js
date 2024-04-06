import Vue from "vue";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";
import App from "./App.vue";

import { routes } from "./routes";
import store from "./store/store";

import EN from "./locale/en.json"
import FA from "./locale/fa.json"

Vue.use(VueRouter);
Vue.use(VueI18n);

const router = new VueRouter({
  routes,
  mode: "history",
});

const i18n = new VueI18n({
  locale: "EN",
  messages: {
    EN : EN,
    FA : FA
  }
})

new Vue({
  el: "#app",
  store,
  router,
  i18n,
  render: (h) => h(App),
});
