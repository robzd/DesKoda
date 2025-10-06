<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const filmes = ref([])

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/trending/movie/day?language=pt-BR',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmEwZDJhMzM1NWQxOTUwYTVhNjZmYjZjNDExNmEzNyIsIm5iZiI6MTc1OTY4MjExOS4wNzcsInN1YiI6IjY4ZTI5ZTQ3M2EwMTA1Njk4ZTljYWI0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IadGfuyXLcwGsFV3Mm4QiCY3QXjWQGYiAK9F61H6nKY'
  }
}

async function carregarFilmes() {
  try {
    const res = await axios.request(options)
    filmes.value = res.data.results.slice(2, 8)
  } catch (erro) {
    console.error('Erro ao buscar filmes:', erro)
  }
}

onMounted(() => {
  carregarFilmes()
})
</script>

<template>
  <div class="filmes-recomendados">
    <h1>Assista aos melhores filmes na Koda Films</h1>

    <section class="filmes-grid">
      <!-- percorre os filmes -->
      <div class="filme" v-for="filme in filmes" :key="filme.id">
        <img
          class="filme-poster"
          :src="`https://image.tmdb.org/t/p/w500${filme.backdrop_path}`"
          :alt="filme.title"
        />
        <p>{{ filme.title }}</p>
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filme-poster {
  width: 100%;
  border-radius: 8px;
  aspect-ratio: 3 / 2;
  object-fit: cover;
}
</style>
