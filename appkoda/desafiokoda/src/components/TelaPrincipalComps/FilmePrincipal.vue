<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import { useFilmes } from '@/composables/useFilme.js'

const router = useRouter();

const { carregarFilmePrincipal, filmePrincipal } = useFilmes()

function verDetalhes(filmeId) {
  router.push({ name: "detalhefilme", params: { filmeid: filmeId } });
}

onMounted(() => {
  carregarFilmePrincipal();
});

</script>

<template>
  <div v-if="filmePrincipal" class="cursor-pointer relative w-full h-30rem" @click="verDetalhes(filmePrincipal.id)">
    <img v-if="filmePrincipal.logo" :src="`https://image.tmdb.org/t/p/original${filmePrincipal.logo}`"
      :alt="`${filmePrincipal.title} logo`" class="absolute w-40rem h-10rem bottom-0 left-0 mb-5 ml-3" style="object-fit: contain;"/>
    <h2 v-else class="absolute bottom-0 left-0 mb-5 ml-3 p-2 border-round-lg">{{ filmePrincipal.title }}</h2>

    <img v-if="filmePrincipal" :src="`https://image.tmdb.org/t/p/original${filmePrincipal.backdrop_path}`"
      :alt="filmePrincipal.title" class="w-full h-full" style="object-fit: cover;"/>
  </div>
</template>

<style scoped>
.titulo-digitado {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgb(0, 0, 0);
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
  border-radius: 5px;
}
</style>
