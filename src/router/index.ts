import { createRouter, createWebHistory } from 'vue-router';
import { mainOrderFlow } from '@/flows/main';
import { trademarkOrderFlow } from '@/flows/trademark';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [mainOrderFlow.route, trademarkOrderFlow.route],
});

export default router;
