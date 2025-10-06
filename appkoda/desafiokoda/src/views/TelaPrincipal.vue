<script setup>
import FilmePrincipal from "../components/FilmePrincipal.vue";
import FilmesRecomendados from "../components/FilmesRecomendados.vue";
</script>

<template>
  <div class="tela-principal">
    <div>
      <FilmePrincipal />
    </div>
    <div>
      <FilmesRecomendados />
    </div>
  </div>
</template>

<style scoped>
.tela-principal {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
}
</style>
