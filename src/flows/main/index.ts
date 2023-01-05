import { contact } from '@/modules/contact';
import { companyInfo } from '@/modules/companyInfo';
import { buildOrderFlow } from '@/flows/buildOrderFlow';

export const main = buildOrderFlow({
  modules: [contact, companyInfo],
  route: {
    path: '/main',
    name: 'MainOrderFlow',
    component: () => import('./MainOrderFlow.vue'),
  },
  summaryComponent: () => import('./MainOrderSummary.vue'),
});
