<template>
  <div class="tela-principal">
    <FilmePrincipal />
  </div>
</template>

<script>
import FilmePrincipal from './FilmePrincipal.vue';

export default {
  name: 'TelaPrincipal',
  components: {
    FilmePrincipal,
  },
}
</script>

<style scoped>
  .tela-principal {
    display: flex;
    height: 100vh;
  }
</style>
