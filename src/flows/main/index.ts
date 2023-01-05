import { contact } from '@/modules/contact';
import { companyInfo } from '@/modules/companyInfo';
import { registeredAgent } from '@/modules/registeredAgent';
import { buildOrderFlow } from '@/flows/buildOrderFlow';

export const mainOrderFlow = buildOrderFlow({
  modules: [contact, companyInfo, registeredAgent],
  route: {
    path: '/main',
    name: 'MainOrderFlow',
    component: () => import('./MainOrderFlow.vue'),
  },
  summaryComponent: () => import('./MainOrderSummary.vue'),
});
