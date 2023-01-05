import { contact } from '@/modules/contact';
import { companyInfo } from '@/modules/companyInfo';
import { buildOrderFlow } from '@/flows/buildOrderFlow';

export const trademarkOrderFlow = buildOrderFlow({
  modules: [companyInfo, contact],
  route: {
    path: '/trademark',
    name: 'TrademarkOrderFlow',
    component: () => import('./TrademarkOrderFlow.vue'),
  },
  summaryComponent: () => import('./TrademarkOrderSummary.vue'),
});
