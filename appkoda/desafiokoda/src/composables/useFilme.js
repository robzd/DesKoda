import { useAxios } from '@/plugins/axios'
import { ref } from 'vue'


export function useFilmes() {
    const axios = useAxios();

    const filmePrincipal = ref();
    const filmesRecomendados = ref([])
    const filmesGenero = ref([])

    const filmeDetalhePrincipal = ref();

    const carregarFilmePrincipal = async () => {
        try {

            const resFilmePrincipal = await axios.get("/trending/movie/day?language=pt-BR");
            const logoPrincipalRes = await axios.get(`/movie/${resFilmePrincipal.data.results[0].id}/images?`,);

            filmePrincipal.value = {
                ...resFilmePrincipal.data.results[0],
                logo: logoPrincipalRes.data.logos.length > 0 ? logoPrincipalRes.data.logos[0].file_path : null
            }

        } catch (erro) {
            console.error("Erro:", erro);
        }
    }

    const carregarFilmesRecomendados = async () => {
        try {
            const resFilmesRecomendados = await axios.get("/trending/movie/day?language=pt-BR");
            filmesRecomendados.value = resFilmesRecomendados.data.results.slice(1, 7)

            for (const filmerecomendado of filmesRecomendados.value) {
                const logoRecomendadosRes = await axios.get(`/movie/${filmerecomendado.id}/images?`)

                filmerecomendado.logo_path = logoRecomendadosRes.data.logos.length > 0 ? logoRecomendadosRes.data.logos[0].file_path : null;
            }
        } catch (erro) {
            console.log("Erro:", erro)
        }
    }

    const carregarFilmesGenero = async (generoId) => {
        try {

            const resGenero = await axios.get(`/discover/movie?&sort_by=popularity.desc&with_genres=${generoId}&language=pt-BR`);
            filmesGenero.value[generoId] = resGenero.data.results.slice(0, 5)

        } catch (erro) {
            console.log("Erro:", erro)
        }
    }

    const carregarFilmeDetalhePrincipal = async () => {
        try{
            const resFilmeDetalhePrincipal = axios.get()
        }catch(erro){
            console.log("Erro:", erro)
        }
    }

    return { 
        filmePrincipal, 
        filmesRecomendados, 
        filmesGenero, 
        filmeDetalhePrincipal, 
        carregarFilmePrincipal, 
        carregarFilmesRecomendados, 
        carregarFilmesGenero, 
        carregarFilmeDetalhePrincipal 
    }

}
