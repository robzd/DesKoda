<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const filmeprincipal = ref();
const logo = ref();

const token = import.meta.env.VITE_TMDB_TOKEN;

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
    filmeprincipal.value = res.data.results[0];

    const logoRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmeprincipal.value.id}/images?`,
      {
        headers: {
          accept: "application/json",
          Authorization: token,
        },
      }
    );
    logo.value =
      logoRes.data.logos.length > 0 ? logoRes.data.logos[0].file_path : null;
  } catch (erro) {
    console.error("Erro:", erro);
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
  <div
    v-if="filmeprincipal"
    class="filme-principal"
    @click="verDetalhes(filmeprincipal.id)"
  >
    <img
      v-if="logo"
      :src="`https://image.tmdb.org/t/p/original${logo}`"
      :alt="`${filmeprincipal.title} logo`"
      class="logo-filme"
    />
    <h2 v-else class="titulo-digitado">{{ filmeprincipal.title }}</h2>

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
