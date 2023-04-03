import type { IOrderModule } from '@/modules/IOrderModule';
import { useContactStore } from '@/modules/contact/store';
import { defineAsyncComponent } from 'vue';

export const contact: IOrderModule = {
  startRoute: 'ContactName',

  routes: [
    {
      path: 'name',
      name: 'ContactName',
      component: () => import('./pages/ContactName.vue'),
    },
    {
      path: 'address',
      name: 'ContactAddress',
      component: () => import('./pages/ContactAddress.vue'),
    },
  ],

  summaryItemComponent: defineAsyncComponent(() => import('./SummaryItem.vue')),

  useModuleStore: useContactStore,
};
