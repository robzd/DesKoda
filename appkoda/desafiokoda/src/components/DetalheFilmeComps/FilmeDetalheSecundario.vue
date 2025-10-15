<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFilmes } from '@/composables/useFilme.js'

const route = useRoute();

const { filmeDetalheSecundario, carregarFilmeDetalheSecundario } = useFilmes();

onMounted(() => {
  carregarFilmeDetalheSecundario(route.params.filmeid);
});
</script>

<template>
  <div v-if="filmeDetalheSecundario" class="flex flex-column align-items-center md:flex-row m-5">
    <div class="flex flex-column align-items-center md:w-5 text-white">
      <h2>Posters:</h2>
      <div class="flex justify-content-center align-items-center gap-3 mt-5">
        <div v-for="(imagem, index) in filmeDetalheSecundario.posters" :key="index">
          <img
            :src="`https://image.tmdb.org/t/p/original${imagem}`"
            :alt="`Imagem secundária ${index + 1}`"
            class="w-full max-w-12rem mb-2 border-round-lg"
          />
        </div>
      </div>
    </div>
    <div class="w-7 text-white gap-2">
      <h2>Créditos</h2>
      <div class="m-4" v-for="(c, i) in filmeDetalheSecundario.creditos" :key="i">
        {{ c.job }}:
        <h3>{{ c.name }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>