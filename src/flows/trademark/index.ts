import { buildOrderFlow } from '@/flows/buildOrderFlow';

export const trademarkOrderFlow = buildOrderFlow({
  path: '/trademark',
  name: 'TrademarkOrderFlow',
  layoutComponent: () => import('./TrademarkOrderFlow.vue'),
  summaryComponent: () => import('./TrademarkOrderSummary.vue'),
});
