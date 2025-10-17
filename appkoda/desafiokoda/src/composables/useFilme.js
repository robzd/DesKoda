import { useAxios } from '@/plugins/axios'
import { ref } from 'vue'


export function useFilmes() {
    const axios = useAxios();

    const filmePrincipal = ref();
    const filmesRecomendados = ref([])
    const filmesGenero = ref([])

    const filmeDetalhePrincipal = ref();
    const filmeDetalheSecundario = ref();
    const filmeElencoDetalhe = ref([]);

    const resultadoPesquisa = ref([])

    const carregarFilmePrincipal = async () => {
        try {

            const resFilmePrincipal = await axios.get("/trending/movie/day?language=pt-BR");
            const resLogoPrincipal = await axios.get(`/movie/${resFilmePrincipal.data.results[0].id}/images?`,);

            filmePrincipal.value = {
                ...resFilmePrincipal.data.results[0],
                logo: resLogoPrincipal.data.logos.length > 0 ? resLogoPrincipal.data.logos[0].file_path : null
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

    const carregarFilmeDetalhePrincipal = async (filmeId) => {
        try {
            const resFilmeDetalhePrincipal = await axios.get(`/movie/${filmeId}?language=pt-BR`);
            const resLogoDetalhePrincipal = await axios.get(`/movie/${filmeId}/images?`);

            console.log("Resposta Filme Principal:");

            filmeDetalhePrincipal.value = {
                ...resFilmeDetalhePrincipal.data,
                logo: resLogoDetalhePrincipal.data.logos.length > 0 ? resLogoDetalhePrincipal.data.logos[0].file_path : null
            };
        } catch (erro) {
            console.log("Erro:", erro)
        }
    }

    const carregarFilmeDetalheSecundario = async (filmeId) => {
        try {
            const resFilmeDetalheSecundario = await axios.get(`/movie/${filmeId}/images`);
            const resCreditosFilme = await axios.get(`/movie/${filmeId}/credits?language=pt-BR`);

            const posters = (resFilmeDetalheSecundario?.data?.posters || [])
                .slice(0, 3)
                .map(p => p.file_path)
                .filter(Boolean);

            const creditosFilme = (resCreditosFilme?.data?.crew || [])
                .slice(0, 3)
                .map((c) => ({
                    job: c.job,
                    name: c.name,
                }));

            filmeDetalheSecundario.value = {
                posters,
                creditos: creditosFilme,
            };

        } catch (erro) {
            console.log("Erro:", erro)
        }
    }

    const carregarFilmeElencoDetalhe = async (filmeId) => {
        try {
            const resElenco = await axios.get(`/movie/${filmeId}/credits?language=pt-BR`);

            filmeElencoDetalhe.value = (resElenco.data.cast ? resElenco.data.cast : [])
                .slice(0, 18)
                .map(c => ({
                    nome: c.name,
                    personagem: c.character,
                    fotoator: c.profile_path,
                }));

        } catch (erro) {
            console.log("Erro:", erro)
        }
    }

    const carregarResultadoPesquisa = async (pesquisa) => {
        try {
            const resPesquisa = await axios.get(`/search/movie?query=${pesquisa}&language=pt-BR&page=1`);

            resultadoPesquisa.value = (
                resPesquisa.data.results ? resPesquisa.data.results : []
            )
                .slice(0, 20)
                .map((a) => ({
                    id: a.id,
                    nome: a.title ? a.title : a.original_title,
                    sinopse: a.overview
                        ? a.overview.length > 90
                            ? a.overview.slice(0, 90) + "..."
                            : a.overview
                        : "Sinopse indisponível",
                    fotofilme: a.poster_path,
                    data: a.release_date ? a.release_date.slice(0, 4) : "—",
                }));

        } catch (erro) {
            console.log("Erro:", erro)
        }
    }


    return {
        filmePrincipal,
        filmesRecomendados,
        filmesGenero,
        filmeDetalhePrincipal,
        filmeDetalheSecundario,
        filmeElencoDetalhe,
        resultadoPesquisa,
        carregarFilmePrincipal,
        carregarFilmesRecomendados,
        carregarFilmesGenero,
        carregarFilmeDetalhePrincipal,
        carregarFilmeDetalheSecundario,
        carregarFilmeElencoDetalhe,
        carregarResultadoPesquisa
    }

}
