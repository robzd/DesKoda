<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();

const filmeId = route.params.id;

const elenco = ref([]);

const token = import.meta.env.VITE_TMDB_TOKEN;

async function carregarFilme() {
  try {
    const elencoRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmeId}/credits?language=pt-BR`,
      {
        headers: {
          accept: "application/json",
          Authorization: token,
        },
      }
    );

    elenco.value = (elencoRes.data.cast ? elencoRes.data.cast : [])
      .slice(0, 18)
      .map((c) => ({
        nome: c.name,
        personagem: c.character,
        fotoator: c.profile_path,
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
  <div v-if="elenco" class="elenco-detalhe">
    <h2>Elenco:</h2>
    <div class="elenco-lista">
      <div class="ator" v-for="ator in elenco" :key="ator.nome">
        <img
          v-if="ator.fotoator"
          :src="`https://image.tmdb.org/t/p/w200${ator.fotoator}`"
          :alt="`Foto de ${ator.nome}`"
        />
        <div v-else>Sem Foto</div>
        <h3>{{ ator.nome }}</h3>
        <p>{{ ator.personagem }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.elenco-detalhe {
  margin-top: 20px;
  color: white;
  align-items: center;
}

.elenco-lista {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  margin-top: 10px;
  padding: 0px 20px;
}

.elenco-lista img {
  width: 100%;
  max-width: 200px;
  margin-bottom: 10px;
  border-radius: 10px;
}

.ator {
  text-align: center;
  width: 120px;
}
</style>