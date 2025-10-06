import { createRouter, createWebHistory } from 'vue-router'
import TelaPrincipal from '../views/TelaPrincipal.vue'
import DetalheFilme from '../views/DetalheFilme.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TelaPrincipal,
    },
    {
      path: '/detalhefilme',
      name: 'detalhefilme',
      component: DetalheFilme,
    },
  ],
})

export default router
