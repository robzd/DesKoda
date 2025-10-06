<template>
  <header>
    <div class="cabecalho">
      <img src="../assets/Logotipo.png" alt="Logo Koda" class="logo" />
      <BarraPesquisa />
    </div>
  </header>
</template>

<script>
import BarraPesquisa from "./BarraPesquisa.vue";

export default {
  name: "TheHeader",
  components: {
    BarraPesquisa,
  },
};
</script>

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
}
</style>