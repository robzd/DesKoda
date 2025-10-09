<script setup>


</script>

<template>
  <div class="tela-principal">
    <div>
      <FilmePrincipal />
    </div>
    <div>
      <FilmesRecomendados />
    </div>
    <div>
      <FilmesGenero :generoId="'28'" />
      <FilmesGenero :generoId="'35'" />
      <FilmesGenero :generoId="'18'" />
      <FilmesGenero :generoId="'27'" />
      <FilmesGenero :generoId="'878'" />
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
