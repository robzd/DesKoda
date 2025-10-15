<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFilmes } from '@/composables/useFilme.js'

const route = useRoute();

const { filmeElencoDetalhe, carregarFilmeElencoDetalhe } = useFilmes();

onMounted(() => {
  carregarFilmeElencoDetalhe(route.params.filmeid);
});
</script>

<template>
  <div v-if="filmeElencoDetalhe" class="mt-3 text-white align-items-center">
    <h2>Elenco:</h2>
    <div class="grid justify-content-center mt-4 px-2 gap-3">
      <div class="text-center col-12 sm:col-3 lg:col-1" v-for="ator in filmeElencoDetalhe" :key="ator.nome">
        <img
          v-if="ator.fotoator"
          :src="`https://image.tmdb.org/t/p/w200${ator.fotoator}`"
          :alt="`Foto de ${ator.nome}`"
          class="w-full max-w-10rem mb-2 border-round-lg"
        />
        <div v-else>Sem Foto</div>
        <h3>{{ ator.nome }}</h3>
        <p>{{ ator.personagem }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>