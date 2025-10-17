import './assets/main.css'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from '@/plugins/axios'

// componentes PrimeVue
import Button from "primevue/button"
import InputText from "primevue/inputtext";
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Select from 'primevue/select';
import Dialog from 'primevue/dialog';
import Card from 'primevue/card';
import Carousel from 'primevue/carousel';

// Importações dos Componentes do Sistema
import FilmePrincipal from "./components/TelaPrincipalComps/FilmePrincipal.vue";
import FilmesRecomendados from "./components/TelaPrincipalComps/FilmesRecomendados.vue";
import FilmesGenero from "./components/TelaPrincipalComps/FilmesGenero.vue";
import FilmeDetalhePrincipal from "./components/DetalheFilmeComps/FilmeDetalhePrincipal.vue";
import FilmeDetalheSecundario from "./components/DetalheFilmeComps/FilmeDetalheSecundario.vue";
import ElencoDetalhe from "./components/DetalheFilmeComps/ElencoDetalhe.vue";
import TheHeader from "./components/HeaderComps/TheHeader.vue";

const app = createApp(App)


// Componentes do Sistema
app.component('Button', Button)
app.component('InputText', InputText)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('Select', Select)
app.component('Dialog', Dialog)
app.component('Card', Card)
app.component('Carousel', Carousel)

// Componentes do Projeto

app.component('FilmePrincipal', FilmePrincipal)
app.component('FilmesRecomendados', FilmesRecomendados)
app.component('FilmesGenero', FilmesGenero)
app.component('FilmeDetalhePrincipal', FilmeDetalhePrincipal)
app.component('FilmeDetalheSecundario', FilmeDetalheSecundario)
app.component('ElencoDetalhe', ElencoDetalhe)
app.component('TheHeader', TheHeader)


app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ''
    }
  }
})

app.use(axios, {
  baseURL: import.meta.env.VITE_API_URL,
  token: import.meta.env.VITE_TMDB_TOKEN,
})

app.use(createPinia())
app.use(router)

app.mount('#app')
