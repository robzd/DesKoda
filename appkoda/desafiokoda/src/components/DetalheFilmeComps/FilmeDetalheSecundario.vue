<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFilmes } from '@/composables/useFilme.js'

const route = useRoute();

const { filmeDetalheSecundario, carregarFilmeDetalheSecundario } = useFilmes();

onMounted(() => {
  carregarFilmeDetalheSecundario(route.params.filmeid);
});
</script>

<template>
  <div v-if="filmeDetalheSecundario" class="filme-detalhe-secundario">
    <div class="posters">
      <h2>Posters:</h2>
      <div class="imagens-secundarias">
        <div v-for="(imagem, index) in filmeDetalheSecundario.posters" :key="index">
          <img
            :src="`https://image.tmdb.org/t/p/original${imagem}`"
            :alt="`Imagem secundária ${index + 1}`"
          />
        </div>
      </div>
    </div>
    <div class="infos-adicionais">
      <h2>Créditos</h2>
      <div class="info-item" v-for="(c, i) in filmeDetalheSecundario.creditos" :key="i">
        {{ c.job }}:
        <h3>{{ c.name }}</h3>
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