<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const filmeId = route.params.id;

const filme = ref(null);

async function carregarFilme() {
  try {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${filmeId}`, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmEwZDJhMzM1NWQxOTUwYTVhNjZmYjZjNDExNmEzNyIsIm5iZiI6MTc1OTY4MjExOS4wNzcsInN1YiI6IjY4ZTI5ZTQ3M2EwMTA1Njk4ZTljYWI0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IadGfuyXLcwGsFV3Mm4QiCY3QXjWQGYiAK9F61H6nKY",
      },
    });
    filme.value = res.data;
  } catch (erro) {
    console.error("Erro ao buscar detalhes do filme:", erro);
  }
}

onMounted(() => {
  carregarFilme();
});
</script>

<template>
  <div v-if="filme">
    <h1>{{ filme.title }}</h1>
    <p>{{ filme.overview }}</p>
    <p>Lançamento: {{ filme.release_date }}</p>
    <img :src="`https://image.tmdb.org/t/p/w500${filme.poster_path}`" />
  </div>
</template>


<style scoped>
</style>