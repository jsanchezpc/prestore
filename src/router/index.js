import { createRouter, createWebHistory } from 'vue-router';

import HomeLayout from './../layouts/HomeLayout.vue';
import ProductLayout from '../layouts/ProductLayout.vue';
// import LoginLayout from '@/layouts/LoginLayout'
// import MetricsLayout from '@/layouts/MetricsLayout'

const routes = [
  { path: '/', component: HomeLayout, props: true },
  { path: '/:webname', component: ProductLayout, props: true },
//   { path: '/metrics', component: MetricsLayout, props: true},
//   { path: '/login', component: LoginLayout, props: false },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;