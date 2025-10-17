import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFavoritosStore = defineStore('favoritos', () => {
    const favoritos = ref([])

    const addFavorito = (item) => {
        if (item) {
            if (!favoritos.value.includes(item)) {
                favoritos.value.push(item)
            }
        }
    }

    const removeFavorito = (item) => {
        favoritos.value = favoritos.value.filter(f => f !== item)
    }

    const isFavorito = (item) => {
        return favoritos.value.includes(item)
    }

    const mostrarFavoritos = computed(() => {
        return favoritos.value
    })

    return { favoritos, addFavorito, removeFavorito, mostrarFavoritos, isFavorito }
}, {
    persist: true,
})
