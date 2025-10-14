<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

import { useFilmes } from '@/composables/useFilme.js'

const router = useRouter();

const { carregarResultadoPesquisa, resultadoPesquisa } = useFilmes()

const visible = ref(false);
const pesquisaFeita = ref("");

function verDetalhes(filmeId) {
  visible.value = false;
  router.push({ name: "detalhefilme", params: { filmeid: filmeId } });
}

function fazerPesquisa() {
  const q = pesquisaFeita.value.trim();
  if (q) carregarResultadoPesquisa(q);
}

watch(visible, (isOpen) => {
  if (!isOpen) {
    pesquisaFeita.value = "";
    resultadoPesquisa.value = [];
  }
});

</script>

<template>
  <div class="flex justify-content-center">
    <Button label="Qual filme gostaria de assistir?" icon="pi pi-search" @click="visible = true"
      class="gap-2 border-1 border-round-md border-solid border-600 bg-black p-2 pr-3" />


    <Dialog v-model:visible="visible" modal :draggable="false" :closable="false" :dismissableMask="true"
      append-to="body" class="bg-white px-3 py-3 border-round-lg w-30rem" style="max-height: 70%;" :pt="{
        header: { class: 'p-3' }
      }">
      <template #header>
        <IconField class="w-full h-3rem">
          <InputIcon class="pi pi-search" />
          <InputText placeholder="Digite o nome do filme" class="w-full h-full" @keyup.enter="fazerPesquisa"
            autocomplete="off" v-model="pesquisaFeita" />
          <InputIcon class="pi pi-times hover:text-900 cursor-pointer" @click="visible = false" />
        </IconField>
      </template>
      <span class="font-semibold">Resultados da Busca:</span>

      <div class="flex flex-column gap-3 mt-2">
        <div v-for="filme in resultadoPesquisa" :key="filme.id" class="flex gap-3 cursor-pointer"
          @click="verDetalhes(filme.id)">
          <img v-if="filme.fotofilme" :src="`https://image.tmdb.org/t/p/w200${filme.fotofilme}`"
            :alt="`Foto de ${filme.nome}`" class="w-7rem border-round-lg" />
          <div v-else
            class="w-7rem h-10rem flex align-items-center justify-content-center surface-200 border-round-lg text-600">
            Sem Foto
          </div>
          <div class="flex flex-column">
            <h2 class="font-bold m-0">{{ filme.nome }}</h2>
            <h3 class="m-0">{{ filme.data }}</h3>
            <h3 class="m-0">{{ filme.sinopse }}</h3>
          </div>
        </div>

        <div v-if="resultadoPesquisa && resultadoPesquisa.length === 0" class="text-600">
          Nenhum resultado.
        </div>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>