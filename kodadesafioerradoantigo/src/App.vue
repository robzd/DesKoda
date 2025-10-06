<template>
  <div>
    <TheHeader />
    <TelaPrincipal msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TelaPrincipal from "./components/TelaPrincipal.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TelaPrincipal,
  },
};
</script>

<style>
#app {
  top: 0px;
  left: 0px;
}
</style>
