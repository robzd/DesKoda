<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFilmes } from '@/composables/useFilme.js'

const route = useRoute();

const { filmeElencoDetalhe, carregarFilmeElencoDetalhe } = useFilmes();

onMounted(() => {
  carregarFilmeElencoDetalhe(route.params.filmeid);
});
</script>

<template>
  <div v-if="filmeElencoDetalhe" class="elenco-detalhe">
    <h2>Elenco:</h2>
    <div class="elenco-lista">
      <div class="ator" v-for="ator in filmeElencoDetalhe" :key="ator.nome">
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