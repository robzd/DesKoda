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
  <div class="filmes-recomendados">
    <h1>Assista aos melhores filmes na Koda Films</h1>

    <section class="filmes-grid">
      <div class="filme" v-for="filme in filmesRecomendados" :key="filme.id" @click="verDetalhes(filme.id)">
        <img v-if="filme.logo_path" :src="`https://image.tmdb.org/t/p/original${filme.logo_path}`"
          :alt="`${filme.title}`" class="logo-filme" />
        <h5 v-else class="titulo-digitado">{{ filme.title }}</h5>
        <img v-if="filme.backdrop_path" :src="`https://image.tmdb.org/t/p/w500${filme.backdrop_path}`"
          :alt="`${filme.title}`" class="backdrop-filme" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.filmes-recomendados {
  color: white;
  text-align: center;
}

.filmes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  align-items: start;
  width: 60rem;
  margin: 15px auto;
}

.filme {
  position: relative;
  cursor: pointer;
}

.backdrop-filme {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.logo-filme {
  position: absolute;
  bottom: 1rem;
  left: 20px;
  height: 4rem;
  max-width: 8rem;
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
