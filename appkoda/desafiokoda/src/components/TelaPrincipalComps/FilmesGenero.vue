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
  <div class="text-left text-white my-6 mx-6">
    <h2>{{ generos[props.generoId] }}</h2>
    <div class="flex w-70rem mt-2 gap-3">
      <div class="filme" v-for="filme in filmesGenero[props.generoId]" :key="filme.id" @click="verDetalhes(filme.id)">
        <img
          class="w-full border-round-lg object-cover cursor-pointer"
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
</style>