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
  <div v-if="resultadoPesquisa" class="text-900 justify-content-left text-left pr-3 mt-4 max-h-screen">
    <h4>Resultados da busca:</h4>
    <h2>{{ pesquisa }}</h2>

    <div class="listafilmes">
      <div
        v-for="filme in resultadoPesquisa"
        :key="filme.id"
        class="filme-espaco"
        @click="verDetalhes(filme.id)"
      >
        <img
          v-if="filme.fotofilme"
          :src="`https://image.tmdb.org/t/p/w200${filme.fotofilme}`"
          :alt="`Foto de ${filme.nome}`"
        />
        <div v-else>Sem Foto</div>
        <div class="filme-infos">
          <h2>{{ filme.nome }}</h2>
          <h3>{{ filme.data }}</h3>
          <h3>{{ filme.sinopse }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modalpesquisa {
  color: black;
  justify-content: left;
  text-align: left;
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 10px;
  margin-top: 15px;
}

.listafilmes {
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  margin-top: 10px;
}

.filme-espaco {
  display: flex;
  gap: 15px;
  width: 7rem;
  margin-top: 5px;
  width: 100%;
  cursor: pointer;
}

.filme-espaco img {
  width: 7rem;
  border-radius: 8px;
  object-fit: cover;
}

.filme-infos {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filme-infos h2 {
  display: flex;
  flex-direction: column;
  font-weight: 700;
}
</style>