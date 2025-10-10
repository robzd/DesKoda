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
  <div v-if="filmePrincipal" class="filme-principal" @click="verDetalhes(filmePrincipal.id)">
    <img v-if="filmePrincipal.logo" :src="`https://image.tmdb.org/t/p/original${filmePrincipal.logo}`"
      :alt="`${filmePrincipal.title} logo`" class="logo-filme" />
    <h2 v-else class="titulo-digitado">{{ filmePrincipal.title }}</h2>

    <img v-if="filmePrincipal" :src="`https://image.tmdb.org/t/p/original${filmePrincipal.backdrop_path}`"
      :alt="filmePrincipal.title" class="backdrop-filme" />
  </div>
</template>

<style scoped>
.filme-principal {
  height: 80vh;
  width: 100%;
  position: relative;
  cursor: pointer;
}

.backdrop-filme {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.logo-filme {
  position: absolute;
  bottom: 20px;
  left: 20px;
  height: 10rem;
  width: 40rem;
  object-fit: contain;
}

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
