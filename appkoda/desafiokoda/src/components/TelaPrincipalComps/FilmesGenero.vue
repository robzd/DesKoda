<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useFilmes } from "@/composables/useFilme";

const router = useRouter();

const props = defineProps({
  generoId: {
    type: String,
    required: true,
  }
})

const generos = {
    28: "Ação",
    35: "Comédia",
    18: "Drama",
    27: "Terror",
    878: "Ficção Científica",
}

const { carregarFilmesGenero, filmesGenero } = useFilmes();

function verDetalhes(filmeId) {
  router.push({ name: "detalhefilme", params: { filmeid: filmeId } });
}

onMounted(() => {
  carregarFilmesGenero(props.generoId)
});

</script>

<template>
  <div class="filmes-genero">
    <h2>{{ generos[props.generoId] }}</h2>
    <div class="filmes-lista">
      <div class="filme" v-for="filme in filmesGenero[props.generoId]" :key="filme.id" @click="verDetalhes(filme.id)">
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