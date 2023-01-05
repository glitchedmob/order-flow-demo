import type { IOrderModule } from '@/types/IOrderModule';
import { useContactModuleStore } from '@/modules/contact/store';

export const contact: IOrderModule<typeof useContactModuleStore> = {
  routes: [
    {
      path: '/name',
      name: 'ContactName',
      component: () => import('./pages/ContactName.vue'),
    },
    {
      path: '/address',
      name: 'ContactAddress',
      component: () => import('./pages/ContactAddress.vue'),
    },
  ],

  useModuleStore: useContactModuleStore,
};
