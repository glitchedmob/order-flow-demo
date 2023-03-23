import { buildOrderFlow } from '@/flows/buildOrderFlow';

export const formationOrderFlow = buildOrderFlow({
  path: '/formation',
  name: 'FormationOrderFlow',
  layoutComponent: () => import('./FormationOrderFlow.vue'),
  summaryComponent: () => import('./FormationOrderSummary.vue'),
});
