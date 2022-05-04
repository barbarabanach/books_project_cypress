import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import CartPage from './pages/CartPage.vue';
import PlaceOrder from './pages/PlaceOrder.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomePage },
    { path: '/cart', component: CartPage },
    { path: '/cart/order', component: PlaceOrder},
    { path: '/:notFound(.*)', component: NotFound}
  ]
});
export default router;