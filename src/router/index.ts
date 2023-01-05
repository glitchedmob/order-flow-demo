import { createRouter, createWebHistory } from 'vue-router';
import { main } from '@/flows/main';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [main.route],
});

export default router;
