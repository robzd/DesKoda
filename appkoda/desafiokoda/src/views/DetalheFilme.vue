<script setup>

</script>

<template>
  <div class="detalhe-filme">
    <div>
      <FilmeDetalhePrincipal />
    </div>
    <div>
      <FilmeDetalheSecundario />
    </div>
    <div>
      <ElencoDetalhe />
    </div>
  </div>
</template>


<style scoped>
.detalhe-filme {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
}
</style>