import { useAxios } from '@/plugins/axios'
import { ref } from 'vue'


export function useFilmes() {
    const axios = useAxios();

    const listaFilmePrincipal = ref([]);

    const carregarFilme = async () => {
        try {
            const res = await axios.get("/trending/movie/day?language=pt-BR");

            const logoRes = await axios.get(`/movie/${res.data.results[0].id}/images?`,);
            
            const filmeprincipal = {
                ...res.data.results[0],
                logo: logoRes.data.logos.length > 0 ? logoRes.data.logos[0].file_path : null
            }

            console.log(filmeprincipal)

            listaFilmePrincipal.value = filmeprincipal;
        } catch (erro) {
            console.error("Erro:", erro);
        }
    }

    return { listaFilmePrincipal, carregarFilme }

}
