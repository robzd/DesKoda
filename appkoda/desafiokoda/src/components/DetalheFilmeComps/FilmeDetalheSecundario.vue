<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();

const filmeId = route.params.id;

const filmedetalhesecundario = ref([]);
const creditosfilme = ref([]);

const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmEwZDJhMzM1NWQxOTUwYTVhNjZmYjZjNDExNmEzNyIsIm5iZiI6MTc1OTY4MjExOS4wNzcsInN1YiI6IjY4ZTI5ZTQ3M2EwMTA1Njk4ZTljYWI0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IadGfuyXLcwGsFV3Mm4QiCY3QXjWQGYiAK9F61H6nKY";

async function carregarFilme() {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmeId}/images?language=pt-BR`,
      {
        headers: {
          accept: "application/json",
          Authorization: token,
        },
      }
    );
    filmedetalhesecundario.value = (res.data.posters ? res.data.posters : [])
      .slice(0, 3)
      .map((b) => b.file_path);

    const creditsRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmeId}/credits?language=pt-BR`,
      {
        headers: {
          accept: "application/json",
          Authorization: token,
        },
      }
    );

    creditosfilme.value = (creditsRes.data.crew ? creditsRes.data.crew : [])
      .slice(0, 3)
      .map((c) => ({
        job: c.job,
        name: c.name,
      }));
  } catch (erro) {
    console.error("Erro:", erro);
  }
}

onMounted(() => {
  carregarFilme();
});
</script>

<template>
  <div v-if="filmedetalhesecundario" class="filme-detalhe-secundario">
    <div class="posters">
      <h2>Posters:</h2>
      <div class="imagens-secundarias">
        <div v-for="(imagem, index) in filmedetalhesecundario" :key="index">
          <img
            :src="`https://image.tmdb.org/t/p/original${imagem}`"
            :alt="`Imagem secundária ${index + 1}`"
          />
        </div>
      </div>
    </div>
    <div class="infos-adicionais">
      <h2>Créditos</h2>
      <div class="info-item">
        {{ creditosfilme[0]?.job }}:
        <h3>{{ creditosfilme[0]?.name }}</h3>
      </div>
      <div class="info-item">
        {{ creditosfilme[1]?.job }}:
        <h3>{{ creditosfilme[1]?.name }}</h3>
      </div>
      <div class="info-item">
        {{ creditosfilme[2]?.job }}:
        <h3>{{ creditosfilme[2]?.name }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filme-detalhe-secundario {
  margin: 20px 20px;
  display: flex;
}

.imagens-secundarias {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
}

.imagens-secundarias img {
  width: 100%;
  max-width: 200px;
  margin-bottom: 10px;
  border-radius: 10px;
}

.posters {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  color: white;
}

.infos-adicionais {
  width: 60%;
  color: white;
  gap: 10px;
}

.info-item {
  text-align: center;
  margin: 20px;
}
</style>