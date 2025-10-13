<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useFilmes } from "../../composables/useFilme.js";

const router = useRouter();

const { resultadoPesquisa, carregarResultadoPesquisa } = useFilmes();

const emit = defineEmits(["closeModal"]);

const { pesquisa } = defineProps({
  pesquisa: String,
});

function verDetalhes(filmeId) {
  emit("closeModal");
  router.push({ name: "detalhefilme", params: { filmeid: filmeId } });
}

onMounted(() => {
  carregarResultadoPesquisa(pesquisa);
});
</script>

<template>
  <div v-if="resultadoPesquisa" class="text-900 justify-content-left text-left pr-3 mt-4 max-h-28rem overflow-y-auto">
    <h4>Resultados da busca:</h4>
    <h2>{{ pesquisa }}</h2>

    <div class="flex flex-column gap-3 mt-2">
      <div
        v-for="filme in resultadoPesquisa"
        :key="filme.id"
        class="flex gap-3 cursor-pointer bg-cover"
        @click="verDetalhes(filme.id)"
      >
        <img
          v-if="filme.fotofilme"
          :src="`https://image.tmdb.org/t/p/w200${filme.fotofilme}`"
          :alt="`Foto de ${filme.nome}`"
          class="w-7rem border-round-lg"
        />
        <div v-else>Sem Foto</div>
        <div class="flex flex-column">
          <h2 class="font-bold">{{ filme.nome }}</h2>
          <h3>{{ filme.data }}</h3>
          <h3>{{ filme.sinopse }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>