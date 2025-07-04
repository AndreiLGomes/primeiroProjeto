import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import LoginUsuario from '@/components/LoginUsuario.vue';
import ListaProdutos from '@/components/ListaProdutos.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginUsuario
  },
  {
    path: '/produtos',
    name: 'produtos',
    component: ListaProdutos,
    meta: { requiresAuth: true } // Rota protegida
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Middleware global de autenticação
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const logado = auth.isAuthenticated;

  if (to.meta.requiresAuth && !logado) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
