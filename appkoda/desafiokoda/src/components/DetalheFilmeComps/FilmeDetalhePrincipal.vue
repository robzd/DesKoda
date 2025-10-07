<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();

const filmeId = route.params.id;

const filmedetalheprincipal = ref();
const logo = ref();

const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmEwZDJhMzM1NWQxOTUwYTVhNjZmYjZjNDExNmEzNyIsIm5iZiI6MTc1OTY4MjExOS4wNzcsInN1YiI6IjY4ZTI5ZTQ3M2EwMTA1Njk4ZTljYWI0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IadGfuyXLcwGsFV3Mm4QiCY3QXjWQGYiAK9F61H6nKY";

async function carregarFilme() {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmeId}?language=pt-BR`,
      {
        headers: {
          accept: "application/json",
          Authorization: token,
        },
      }
    );
    filmedetalheprincipal.value = res.data;

    const logoRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmedetalheprincipal.value.id}/images?language=pt-BR&include_image_language=pt,null`,
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
    console.error("Erro ao buscar detalhes do filme:", erro);
  }
}

onMounted(() => {
  carregarFilme();
});
</script>

<template>
  <div v-if="filmedetalheprincipal" class="filme-detalhe-principal">
    <div class="filme-infos">
      <img
        v-if="logo"
        :src="`https://image.tmdb.org/t/p/original${logo}`"
        :alt="`${filmedetalheprincipal.title} logo`"
        class="logo-filme"
      />
      <h2 v-else class="titulo-digitado">{{ filmedetalheprincipal.title }}</h2>
      <div class="fileira">
        <p>{{ filmedetalheprincipal.release_date.slice(0, 4) }}</p>
        <p>{{ filmedetalheprincipal.runtime }} min</p>
      </div>
      <div class="fileira">
        <p v-for="genero in filmedetalheprincipal.genres" :key="genero.id">
          {{ genero.name }}
        </p>
      </div>
      <p class="sinopse">{{ filmedetalheprincipal.overview }}</p>
    </div>
    <img
      :src="`https://image.tmdb.org/t/p/original${filmedetalheprincipal.backdrop_path}`"
      :alt="filmedetalheprincipal.title"
      class="backdrop-filme"
    />
  </div>
</template>

<style scoped>
.filme-detalhe-principal {
  height: 80vh;
  width: 100%;
  display: flex;
}

.filme-infos {
  width: 40%;
  height: 100%;
  display: flex;
  color: white;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.logo-filme {
  height: 10rem;
  width: 20rem;
  object-fit: contain;
  margin-bottom: 1rem;
}

.backdrop-filme {
  width: 60%;
  height: 100%;
  object-fit: cover;
  object-position: 100% center;
}

.fileira {
  display: flex;
  gap: 10px;
}

.fileira p {
  font-weight: 700;
}

.sinopse {
  width: 80%;
}

.titulo-digitado {
  color: rgb(0, 0, 0);
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 1rem;
}
</style>

