<template>
  <div class="barra-pesquisa">
    <button type="button" class="search-btn">
      <img src="../assets/search.png" alt="lupa" />
    </button>
    <input
      type="text"
      v-model="termoPesquisa"
      placeholder="Qual filme gostaria de assistir?"
    />
  </div>
</template>

<script setup>
</script>

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
</style>