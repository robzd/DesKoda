<script setup>

const props = defineProps({
  filmeid: String,
})

</script>

<template>
  <div class="flex flex-column h-full gap-5">
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
</style>