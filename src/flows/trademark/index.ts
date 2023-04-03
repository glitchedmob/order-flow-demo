import { buildOrderFlow } from '@/flows/buildOrderFlow';

export const trademarkOrderFlow = buildOrderFlow({
  path: '/trademark',
  name: 'TrademarkOrderFlow',
  layoutComponent: () => import('./TrademarkFlow.vue'),
  orderLayoutComponent: () => import('./TrademarkOrderFlow.vue'),
});
