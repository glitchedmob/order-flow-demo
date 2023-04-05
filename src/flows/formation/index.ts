import { buildOrderFlow } from '@/flows/buildOrderFlow';
import { contact } from '@/modules/contact';
import { thankYou } from '@/modules/thankYou';

export const formationOrderFlow = buildOrderFlow({
  path: '/formation',
  name: 'FormationOrderFlow',
  introModules: [contact],
  reviewModules: [thankYou]
});
