<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();


const filmeprincipal = ref();
const logo = ref();

const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmEwZDJhMzM1NWQxOTUwYTVhNjZmYjZjNDExNmEzNyIsIm5iZiI6MTc1OTY4MjExOS4wNzcsInN1YiI6IjY4ZTI5ZTQ3M2EwMTA1Njk4ZTljYWI0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IadGfuyXLcwGsFV3Mm4QiCY3QXjWQGYiAK9F61H6nKY";

const options = {
  method: "GET",
  url: "https://api.themoviedb.org/3/trending/movie/day?language=pt-BR",
  headers: {
    accept: "application/json",
    Authorization: token,
  },
};

async function carregarFilme() {
  try {
    const res = await axios.request(options);
    filmeprincipal.value = res.data.results[1];

    const logoRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmeprincipal.value.id}/images?language=pt-BR&include_image_language=pt,null`,
      {
        headers: {
          accept: "application/json",
          Authorization: token,
        },
      }
    );

    if (logoRes.data.logos.length > 0) {
      logo.value = logoRes.data.logos[0].file_path;
    }
  } catch (erro) {
    console.error("Erro ao buscar filme ou logo:", erro);
  }
}

  function verDetalhes(filmeId) {
    router.push({ name: "detalhefilme", params: { id: filmeId } });
  }

onMounted(() => {
  carregarFilme();
});
</script>

<template>
  <div class="filme-principal" @click="verDetalhes(filmeprincipal.id)">
    <img
      v-if="logo"
      :src="`https://image.tmdb.org/t/p/original${logo}`"
      :alt="`${filmeprincipal.title} logo`"
      class="logo-filme"
    />
    <img
      v-if="filmeprincipal"
      :src="`https://image.tmdb.org/t/p/original${filmeprincipal.backdrop_path}`"
      :alt="filmeprincipal.title"
      class="backdrop-filme"
    />
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
</style>
