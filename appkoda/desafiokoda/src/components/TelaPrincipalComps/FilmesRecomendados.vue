<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import { useFilmes } from "@/composables/useFilme";

const router = useRouter();

const { carregarFilmesRecomendados, filmesRecomendados } = useFilmes();

function verDetalhes(filmeId) {
  router.push({ name: "detalhefilme", params: { filmeid: filmeId } });
}

onMounted(() => {
  carregarFilmesRecomendados();
});
</script>

<template>
  <div class="text-white text-center">
    <h1>Assista aos melhores filmes na Koda Films</h1>

    <section class="grid justify-content-center gap-1 w-full my-2">
      <div class="relative cursor-pointer col-12 sm:col-5 lg:col-3" v-for="filme in filmesRecomendados" :key="filme.id" @click="verDetalhes(filme.id)">
        <img v-if="filme.logo_path" :src="`https://image.tmdb.org/t/p/original${filme.logo_path}`"
          :alt="`${filme.title}`" class="absolute bottom-0 left-0 pb-4 pl-2 h-4rem max-w-12rem object-contain " />
        <h5 v-else class="absolute bottom-0 left-0 mb-4 ml-4 text-900 bg-white-alpha-50 p-2 border-round-md">{{ filme.title }}</h5>
        <img v-if="filme.backdrop_path" :src="`https://image.tmdb.org/t/p/w500${filme.backdrop_path}`"
          :alt="`${filme.title}`" class="w-full object-cover border-round-lg" />
      </div>
    </section>
  </div>
</template>

<style scoped>
</style>
