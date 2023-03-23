import { createRouter, createWebHistory } from 'vue-router';
import { formationOrderFlow } from '@/flows/formation';
import { trademarkOrderFlow } from '@/flows/trademark';
import FlowListing from '@/components/FlowListing.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'FlowListing',
      component: FlowListing,
    },
    formationOrderFlow.route,
    trademarkOrderFlow.route,
  ],
});

export default router;
