<script setup>
import { ref } from "vue";
import ModalPesquisa from "./ModalPesquisa.vue";

const openModal = ref(false);
const pesquisaFeita = ref("");
</script>

<template>
  <div class="barra-pesquisa">
    <button type="button" class="search-btn">
      <img src="@/assets/search.png" alt="lupa" />
    </button>
    <input
      type="text"
      placeholder="Qual filme gostaria de assistir?"
      @keyup.enter="openModal = true"
      v-model="pesquisaFeita"
      maxlength="40"
    />

    <div v-if="openModal" class="modal">
      <div class="modal-branco">
        <button class="modal-close" @click="openModal = false">×</button>
        <ModalPesquisa
          :digitado="pesquisaFeita"
          :key="pesquisaFeita"
          @closeModal="openModal = false"
        />
      </div>
    </div>
  </div>
</template>


<style scoped>
.barra-pesquisa {
  position: relative;
}

input[type="text"] {
  padding: 6px 10px 6px 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: "Inter", sans-serif;
  color: #767676;
  background-color: black;
  width: 38vh;
}

.search-btn {
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.search-btn img {
  width: 18px;
  height: auto;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-branco {
  background-color: white;
  padding: 20px 30px;
  border-radius: 10px;
  width: 50%;
  position: relative;
  text-align: center;
}

.modal-close {
  position: absolute;
  top: 8px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 30px;
  cursor: pointer;
}
</style>