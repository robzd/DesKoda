<script setup>
import FilmeDetalhePrincipal from "../components/DetalheFilmeComps/FilmeDetalhePrincipal.vue";
import FilmeDetalheSecundario from "../components/DetalheFilmeComps/FilmeDetalheSecundario.vue";
import ElencoDetalhe from "../components/DetalheFilmeComps/ElencoDetalhe.vue";
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