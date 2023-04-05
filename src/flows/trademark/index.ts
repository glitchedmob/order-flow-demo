import { buildOrderFlow } from '@/flows/buildOrderFlow';
import { contact } from '@/modules/contact';
import { thankYou } from '@/modules/thankYou';

export const trademarkOrderFlow = buildOrderFlow({
  path: '/trademark',
  name: 'TrademarkOrderFlow',
  introModules: [contact],
  reviewModules: [thankYou]
});
