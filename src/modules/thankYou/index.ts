import type { IOrderReviewModule } from '@/modules/IOrderModule';
import ThankYou from './pages/ThankYou.vue';

export const thankYou: IOrderReviewModule = {
  startRoute: 'ThankYou',

  routes: [
    {
      path: 'thank-you',
      name: 'ThankYou',
      component: ThankYou,
    },
  ],
};
