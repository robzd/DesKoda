<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const emit = defineEmits(["closeModal"]);

const { digitado } = defineProps({
  digitado: String,
});

const resultadofilmes = ref([]);

const token = import.meta.env.VITE_TMDB_TOKEN;

async function carregarFilmes() {
  try {
    const filmesRes = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${digitado}&language=pt-BR&page=1`,
      {
        headers: {
          accept: "application/json",
          Authorization: token,
        },
      }
    );

    resultadofilmes.value = (
      filmesRes.data.results ? filmesRes.data.results : []
    )
      .slice(0, 20)
      .map((a) => ({
        id: a.id,
        nome: a.original_title,
        sinopse: a.overview
          ? a.overview.length > 150
            ? a.overview.slice(0, 150) + "..."
            : a.overview
          : "Sinopse indisponível",
        fotofilme: a.poster_path,
        data: a.release_date ? a.release_date.slice(0, 4) : "—",
      }));
  } catch (erro) {
    console.error("Erro:", erro);
  }
}

function verDetalhes(filmeId) {
  emit("closeModal");
  router.push({ name: "detalhefilme", params: { id: filmeId } });
}

onMounted(() => {
  carregarFilmes();
});
</script>

<template>
  <div v-if="resultadofilmes" class="modalpesquisa">
    <h4>Resultados da busca:</h4>
    <h2>{{ digitado }}</h2>

    <div class="listafilmes">
      <div
        v-for="filme in resultadofilmes"
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