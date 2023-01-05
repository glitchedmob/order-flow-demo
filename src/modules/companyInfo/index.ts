import type { IOrderModule } from '@/types/IOrderModule';
import { defineAsyncComponent } from 'vue';
import { useCompanyInfoModuleStore } from '@/modules/companyInfo/store';

export const contact: IOrderModule<typeof useCompanyInfoModuleStore> = {
  startRoute: 'CompanyName',

  routes: [
    {
      path: '/company-name',
      name: 'CompanyName',
      component: () => import('./pages/CompanyName.vue'),
    },
    {
      path: '/company-address',
      name: 'CompanyAddress',
      component: () => import('./pages/CompanyAddress.vue'),
    },
  ],

  summaryItemComponent: defineAsyncComponent(() => import('./SummaryItem.vue')),

  useModuleStore: useCompanyInfoModuleStore,
};
