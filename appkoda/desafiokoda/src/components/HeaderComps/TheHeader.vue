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
    <div class="cabecalho">
      <img
        src="@/assets/Logotipo.png"
        alt="Logo Koda"
        class="logo"
        @click="irParaHome()"
      />
      <BarraPesquisa />
    </div>
  </nav>
</template>



<style scoped>
.cabecalho {
  display: flex;
  padding: 10px 70px;
  color: white;
  justify-content: space-between;
  align-items: center;
}
.logo {
  height: 40px;
  width: auto;
  cursor: pointer;
}
</style>