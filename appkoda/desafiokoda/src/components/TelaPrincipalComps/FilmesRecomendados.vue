<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();

const filmes = ref([]);
const logo = ref();

const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmEwZDJhMzM1NWQxOTUwYTVhNjZmYjZjNDExNmEzNyIsIm5iZiI6MTc1OTY4MjExOS4wNzcsInN1YiI6IjY4ZTI5ZTQ3M2EwMTA1Njk4ZTljYWI0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IadGfuyXLcwGsFV3Mm4QiCY3QXjWQGYiAK9F61H6nKY";

const options = {
  method: "GET",
  url: `https://api.themoviedb.org/3/trending/movie/day?language=pt-BR`,
  headers: {
    accept: "application/json",
    Authorization: token,
  },
};

async function carregarFilmes() {
  try {
    const res = await axios.request(options);
    filmes.value = res.data.results.slice(1, 7);

    for (const filme of filmes.value) {
      const logoRes = await axios.get(
        `https://api.themoviedb.org/3/movie/${filme.id}/images?language=pt-BR&include_image_language=pt,null`,
        {
          headers: {
            accept: "application/json",
            Authorization: token,
          },
        }
      );
      filme.logo_path =
        logoRes.data.logos.length > 0 ? logoRes.data.logos[0].file_path : null;
    }
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
  <div class="filmes-recomendados">
    <h1>Assista aos melhores filmes na Koda Films</h1>

    <section class="filmes-grid">
      <div
        class="filme"
        v-for="filme in filmes"
        :key="filme.id"
        @click="verDetalhes(filme.id)"
      >
        <img
          v-if="filme.logo_path"
          :src="`https://image.tmdb.org/t/p/original${filme.logo_path}`"
          :alt="`${filme.title}`"
          class="logo-filme"
        />
        <h5 v-else class="titulo-digitado">{{ filme.title }}</h5>
        <img
          v-if="filme.backdrop_path"
          :src="`https://image.tmdb.org/t/p/w500${filme.backdrop_path}`"
          :alt="`${filme.title}`"
          class="backdrop-filme"
        />
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
