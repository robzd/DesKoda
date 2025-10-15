<script setup>
import BarraPesquisa from "./BarraPesquisa.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function irParaHome() {
  router.push({ name: "home" });
}
</script>

<template>
  <nav>
    <div class="flex py-2 px-4 md:px-8 align-items-center justify-content-between">
      <img
        src="@/assets/Logotipo.png"
        alt="Logo Koda"
        class="h-3.5rem w-auto cursor-pointer"
        @click="irParaHome()"
      />
      <BarraPesquisa />
    </div>
  </nav>
</template>



<style scoped>
</style>