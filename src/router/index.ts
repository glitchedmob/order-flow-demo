import { createRouter, createWebHistory } from 'vue-router';
import { mainOrderFlow } from '@/flows/main';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [mainOrderFlow.route],
});

export default router;
