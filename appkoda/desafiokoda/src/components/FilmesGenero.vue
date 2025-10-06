<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  generoId: {
    type: String,
    required: true,
  },
});

const filmes = ref([]);

const generos = {
    28: "Ação",
    35: "Comédia",
    18: "Drama",
    27: "Terror",
    878: "Ficção Científica",
}

const options = {
  method: "GET",
  url: `https://api.themoviedb.org/3/discover/movie?&sort_by=popularity.desc&with_genres=${props.generoId}&language=pt-BR`,
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmEwZDJhMzM1NWQxOTUwYTVhNjZmYjZjNDExNmEzNyIsIm5iZiI6MTc1OTY4MjExOS4wNzcsInN1YiI6IjY4ZTI5ZTQ3M2EwMTA1Njk4ZTljYWI0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IadGfuyXLcwGsFV3Mm4QiCY3QXjWQGYiAK9F61H6nKY",
  },
};

async function carregarFilmes() {
  try {
    const res = await axios.request(options);
    filmes.value = res.data.results.slice(0, 5);
  } catch (erro) {
    console.error("Erro ao buscar filmes:", erro);
  }
}

function verDetalhes(filmeId) {
  router.push({ name: "detalhefilme", params: { id: filmeId } });
}

onMounted(() => {
  carregarFilmes();
});

</script>

<template>
  <div class="filmes-genero">
    <h2>{{ generos[props.generoId]}}</h2>
    <div class="filmes-lista">
      <div class="filme" v-for="filme in filmes" :key="filme.id" @click="verDetalhes(filme.id)">
        <img
          class="filme-poster"
          :src="`https://image.tmdb.org/t/p/w500${filme.poster_path}`"
          :alt="filme.title"
        />
        <div class="filme-infos">
          <strong>{{ filme.title }}</strong>
          <p>{{ filme.release_date.slice(0, 4) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filmes-genero {
  color: white;
  text-align: left;
  margin: 30px 5rem;
}

.filmes-lista {
  display: flex;
  gap: 15px;
  width: 70rem;
  margin-top: 10px;
}

.filme-poster {
  width: 100%;
  border-radius: 8px;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  cursor: pointer;
}
</style>