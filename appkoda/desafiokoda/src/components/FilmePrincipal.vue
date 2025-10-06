<script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'

  const filmeprincipal = ref()

  const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/trending/movie/day?language=pt-BR',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmEwZDJhMzM1NWQxOTUwYTVhNjZmYjZjNDExNmEzNyIsIm5iZiI6MTc1OTY4MjExOS4wNzcsInN1YiI6IjY4ZTI5ZTQ3M2EwMTA1Njk4ZTljYWI0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IadGfuyXLcwGsFV3Mm4QiCY3QXjWQGYiAK9F61H6nKY'
  }
}

async function carregarFilme() {
  try {
    const res = await axios.request(options)
    filmeprincipal.value = res.data.results[10]
  } catch (erro) {
    console.error('Erro ao buscar filme:', erro)
  }
}

onMounted(() => {
  carregarFilme()
})

</script>

<template>
  <div class="filme-principal">
    <img
      v-if="filmeprincipal"
      :src="`https://image.tmdb.org/t/p/original${filmeprincipal.backdrop_path}`"
      :alt="filmeprincipal.title"
    />
  </div>
</template>


<style scoped>
.filme-principal {
  height: 80vh;
  width: 100%;
}
.filme-principal img {
  height: 100%;
  width: 100%;
}
</style>