<script setup>
    import BarraPesquisa from "./BarraPesquisa.vue";
</script>

<template>
  <nav>
    <div class="cabecalho">
      <img src="../assets/Logotipo.png" alt="Logo Koda" class="logo" />
      <!-- 
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/detalhefilme">Detalhe Filme</RouterLink>
      -->
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
}
</style>