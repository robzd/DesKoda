<script setup>
import { RouterLink, RouterView } from "vue-router";
import TheHeader from "./components/HeaderComps/TheHeader.vue";
</script>

<template>
  <div class="app">
    <TheHeader />
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<style scoped>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 0px;
  width: 100%;
  min-height: 100vh;
  background-color: #000000;
}
</style>
