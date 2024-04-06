<template>
  <div id="app" :class="[ themeColor, {rtl: setRTL}]">
    <app-header></app-header>
    <div class="content">
      <app-navigation></app-navigation>
      <div class="home">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Header from "./components/Header.vue";

export default {
  name: "app",
  computed: {
    themeColor() {
      return this.$store.state.users.activeUser.themeColor;
    },
    setRTL() {
      const locale = this.$store.state.users.activeUser.locale;
      return locale === "FA";
    },
  },
  components: {
    "app-navigation": Navigation,
    "app-header": Header,
  },
};
</script>
