import type { IOrderModule } from '@/modules/IOrderModule';
import { useContactStore } from '@/modules/contact/store';
import { defineAsyncComponent } from 'vue';
import ContactAddress from './pages/ContactAddress.vue';
import ContactName from './pages/ContactName.vue';

export const contact: IOrderModule = {
  startRoute: 'ContactName',

  routes: [
    {
      path: 'name',
      name: 'ContactName',
      component: ContactName,
    },
    {
      path: 'address',
      name: 'ContactAddress',
      component: ContactAddress,
    },
  ],

  summaryItemComponent: defineAsyncComponent(() => import('./SummaryItem.vue')),

  useModuleStore: useContactStore,
};
