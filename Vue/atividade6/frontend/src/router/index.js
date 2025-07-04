import { createRouter, createWebHistory } from 'vue-router';
import FormLogin from '../components/FormLogin.vue';
import ListaUsuarios from '../components/ListaUsuarios.vue';

const routes = [
    { path: '/', name: 'Login', component: FormLogin },
    {
        path: '/usuarios',
        name: 'Usuarios',
        component: ListaUsuarios,
        beforeEnter: (to, from, next) => {
            const token = localStorage.getItem('token');
            if (!token) {
                next('/');
            } else {
                next();
            }
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
