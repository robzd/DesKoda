<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFilmes } from '@/composables/useFilme.js'

const route = useRoute();

const { carregarFilmeDetalhePrincipal, filmeDetalhePrincipal } = useFilmes()

onMounted(() => {
  carregarFilmeDetalhePrincipal(route.params.filmeid);
});
</script>

<template>
  <div v-if="filmeDetalhePrincipal" class="filme-detalhe-principal">
    <div class="filme-infos">
      <img
        v-if="filmeDetalhePrincipal.logo"
        :src="`https://image.tmdb.org/t/p/original${filmeDetalhePrincipal.logo}`"
        :alt="`${filmeDetalhePrincipal.title} logo`"
        class="logo-filme"
      />
      <h2 v-else class="titulo-digitado">{{ filmeDetalhePrincipal.title }}</h2>
      <div class="fileira">
        <p>{{ filmeDetalhePrincipal.release_date.slice(0, 4) }}</p>
        <p>{{ filmeDetalhePrincipal.runtime }} min</p>
      </div>
      <div class="fileira">
        <p v-for="genero in filmeDetalhePrincipal.genres" :key="genero.id">
          {{ genero.name }}
        </p>
      </div>
      <p v-if="filmeDetalhePrincipal.overview" class="sinopse">
        {{ filmeDetalhePrincipal.overview }}
      </p>
      <p v-else class="sinopse">Sinopse indisponível</p>
    </div>
    <img
      :src="`https://image.tmdb.org/t/p/original${filmeDetalhePrincipal.backdrop_path}`"
      :alt="filmeDetalhePrincipal.title"
      class="backdrop-filme"
    />
  </div>
</template>

<style scoped>
.filme-detalhe-principal {
  height: 80vh;
  width: 100%;
  display: flex;
}

.filme-infos {
  width: 40%;
  height: 100%;
  display: flex;
  color: white;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.logo-filme {
  height: 10rem;
  width: 20rem;
  object-fit: contain;
  margin-bottom: 1rem;
}

.backdrop-filme {
  width: 60%;
  height: 100%;
  object-fit: cover;
  object-position: 100% center;
}

.fileira {
  display: flex;
  gap: 10px;
}

.fileira p {
  font-weight: 700;
}

.sinopse {
  width: 80%;
}

.titulo-digitado {
  color: rgb(0, 0, 0);
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 1rem;
}
</style>

