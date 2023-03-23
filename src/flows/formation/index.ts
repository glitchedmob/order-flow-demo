import { contact } from '@/modules/contact';
import { companyInfo } from '@/modules/companyInfo';
import { registeredAgent } from '@/modules/registeredAgent';
import { buildOrderFlow } from '@/flows/buildOrderFlow';

export const formationOrderFlow = buildOrderFlow({
  modules: [contact, companyInfo, registeredAgent],
  route: {
    path: '/formation',
    name: 'FormationOrderFlow',
    component: () => import('./FormationOrderFlow.vue'),
  },
  summaryComponent: () => import('./FormationOrderSummary.vue'),
});
