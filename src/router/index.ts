import { createRouter, createWebHistory } from 'vue-router';
import { formationOrderFlow } from '@/flows/formation';
import { trademarkOrderFlow } from '@/flows/trademark';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [formationOrderFlow.route, trademarkOrderFlow.route],
});

export default router;
