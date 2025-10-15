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
  <!-- @click="verDetalhes(filmePrincipal.id)" -->
  <div v-if="filmePrincipal" class="relative flex flex-column justify-content-end align-items-start gap-3 px-4 pb-8 md:pl-7 w-full h-30rem bg-cover bg-center" :style="`background-image: url('https://image.tmdb.org/t/p/original${filmePrincipal.backdrop_path}');`">
    <div class="z-5 flex flex-column gap-4 align-items-center">
      <img v-if="filmePrincipal.logo" :src="`https://image.tmdb.org/t/p/original${filmePrincipal.logo}`"
      :alt="`${filmePrincipal.title} logo`" class="w-full max-w-25rem md:w-30rem " style="object-fit: contain;"/>
      <h2 v-else class="text-5xl md:text-7xl text-white font-bold w-full">{{ filmePrincipal.title }}</h2>
      <Button label="Assistir Trailer" class="bg-white-alpha-10 border-white hover:bg-white-alpha-20 uppercase px-4 py-3"  size="small" :pt="{
          label:{ class: 'font-semibold' }
      }"  @click="verDetalhes(filmePrincipal.id)" />
    </div>
      <div class="absolute bottom-0 left-0 h-full w-full" style="background:linear-gradient(180deg, rgba(0, 0, 0, 0.6) 3.96%, rgba(0, 0, 0, 0) 25.36%, rgba(0, 0, 0, 0) 28.99%), radial-gradient(69.3% 110.54% at 60.4% -13.07%, rgba(0, 0, 0, 0) 42.04%, #000000 100%)"></div>
  </div>
</template>

<style scoped>
</style>
