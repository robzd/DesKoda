<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useFilmes } from '@/composables/useFilme.js'
import { useFavoritosStore } from '@/stores/favoritos.js'

const storefavoritos = useFavoritosStore();

const route = useRoute();

const { carregarFilmeDetalhePrincipal, filmeDetalhePrincipal } = useFilmes()

const mostrarFilmesFavoritos = ref(false);

function toggleMostrarFilmesFavoritos() {
  mostrarFilmesFavoritos.value = !mostrarFilmesFavoritos.value;
}

onMounted(async() => {
  await carregarFilmeDetalhePrincipal(route.params.filmeid);
});
</script>

<template>
  <div v-if="filmeDetalhePrincipal"
    class="relative flex flex-column justify-content-end align-items-start gap-3 px-4 pb-8 md:pl-7 w-full h-30rem bg-cover bg-center"
    :style="`background-image: url('https://image.tmdb.org/t/p/original${filmeDetalhePrincipal.backdrop_path}');`">
    <div class="flex text-white align-items-center flex-column justify-content-center gap-2 h-full pt-6 w-5 z-5">
      <img v-if="filmeDetalhePrincipal.logo" :src="`https://image.tmdb.org/t/p/original${filmeDetalhePrincipal.logo}`"
        :alt="`${filmeDetalhePrincipal.title} logo`" class="max-h-8rem w-full max-w-25rem mt-6 mb-3"
        style="object-fit: contain;" />
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
    <div class="absolute bottom-0 left-0 h-full w-full"
      style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 19.6%), radial-gradient(97.07% 97.07% at 60.4% -13.07%, rgba(0, 0, 0, 0) 56.64%, #000000 100%);">
    </div>
  </div>
  <div v-if="storefavoritos.isFavorito(filmeDetalhePrincipal?.title)" >
    <Button label="Remover dos Favoritos"
      class="bg-gray-600 align border-white hover:bg-gray-500 uppercase px-4 py-2 mt-2 z-5" size="small"
      @click="storefavoritos.removeFavorito(filmeDetalhePrincipal?.title)" :pt="{
        label: { class: 'font-semibold' }
      }" />
  </div>
  <div v-else>
    <Button label="Adicionar aos Favoritos"
      class="bg-orange-600 align border-white hover:bg-orange-500 uppercase px-4 py-2 mt-2 z-5" size="small"
      @click="storefavoritos.addFavorito(filmeDetalhePrincipal?.title)" :pt="{
        label: { class: 'font-semibold' }
      }" />
  </div>
  <br>
  <Button label="Ver Filmes Favoritos"
    class="bg-red-600 align border-white hover:bg-red-500 uppercase px-4 py-2 mt-2 z-5" size="small"
    @click="toggleMostrarFilmesFavoritos()" :pt="{
      label: { class: 'font-semibold' }
    }" />
    <div v-if="mostrarFilmesFavoritos" v-for="filme in storefavoritos.mostrarFavoritos" :key="filme" class="mt-2 text-white">
      {{ filme }}
    </div>
</template>

<style scoped></style>
