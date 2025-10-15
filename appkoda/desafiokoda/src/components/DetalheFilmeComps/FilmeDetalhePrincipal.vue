<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFilmes } from '@/composables/useFilme.js'

const route = useRoute();

const { carregarFilmeDetalhePrincipal, filmeDetalhePrincipal } = useFilmes()

onMounted(() => {
  carregarFilmeDetalhePrincipal(route.params.filmeid);
});
</script>

<template>
  <div v-if="filmeDetalhePrincipal" class="flex flex-column align-items-center md:flex-row w-full">
    <img :src="`https://image.tmdb.org/t/p/original${filmeDetalhePrincipal.backdrop_path}`"
      :alt="filmeDetalhePrincipal.title" class=" w-full md:w-7 h-full object-cover "
      style="object-position: right center;" />
    <div class="flex text-white align-items-center flex-column justify-content-center gap-2 h-full w-5">
      <img v-if="filmeDetalhePrincipal.logo" :src="`https://image.tmdb.org/t/p/original${filmeDetalhePrincipal.logo}`"
        :alt="`${filmeDetalhePrincipal.title} logo`" class="h-5rem w-25rem my-6" />
      <h2 v-else class="text-black bg-indisponivel p-2 border-round-md mb-1rem">{{ filmeDetalhePrincipal.title }}</h2>
      <div class="flex gap-3">
        <p>{{ filmeDetalhePrincipal.release_date.slice(0, 4) }}</p>
        <p>{{ filmeDetalhePrincipal.runtime }} min</p>
      </div>
      <div class="flex gap-3">
        <p v-for="genero in filmeDetalhePrincipal.genres" :key="genero.id" class="font-bold">
          {{ genero.name }}
        </p>
      </div>
      <p v-if="filmeDetalhePrincipal.overview" class="w-10">
        {{ filmeDetalhePrincipal.overview }}
      </p>
      <p v-else class="w-10">Sinopse indisponível</p>
    </div>

  </div>
</template>

<style scoped></style>
