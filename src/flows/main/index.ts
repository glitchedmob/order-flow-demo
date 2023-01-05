import { contact } from '@/modules/contact';
import { buildOrderFlow } from '@/flows/buildOrderFlow';

export const main = buildOrderFlow({
  modules: [contact],
  route: {
    path: '/main',
    name: 'MainOrderFlow',
    component: () => import('./MainOrderFlow.vue'),
  },
  summaryComponent: () => import('./MainOrderSummary.vue'),
});
