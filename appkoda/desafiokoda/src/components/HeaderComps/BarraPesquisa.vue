<script setup>
import { ref } from "vue";
import ModalPesquisa from "./ModalPesquisa.vue";

const openModal = ref(false);
const pesquisaFeita = ref("");
</script>

<template>
  <div class="relative">
    <IconField>
      <InputIcon class="pi pi-search text-200" />
      <InputText type="text" placeholder="Qual filme gostaria de assistir?" @keyup.enter="openModal = true"
        v-model="pesquisaFeita" maxlength="40" size="small" class="bg-black border-600 text-white w-16rem pl-5" />
    </IconField>
    <div v-if="openModal"
      class="fixed top-0 left-0 w-full h-full flex align-items-center justify-content-center z-5 bg-black-alpha-60 bg-opacity-50">
      <div class="bg-white px-3 py-3 border-round-lg w-30rem h-40rem text-center shadow-2 relative">
        <button class="absolute top-0 right-0 mt-2 mr-2 bg-transparent border-none cursor-pointer text-2xl"
          @click="openModal = false">×</button>
        <ModalPesquisa :pesquisa="pesquisaFeita" :key="pesquisaFeita" @closeModal="openModal = false" />
      </div>
    </div>
  </div>
</template>


<style scoped>
</style>