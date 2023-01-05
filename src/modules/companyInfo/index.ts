import type { IOrderModule } from '@/modules/IOrderModule';
import { defineAsyncComponent } from 'vue';
import { useCompanyInfoModuleStore } from '@/modules/companyInfo/store';

export const companyInfo: IOrderModule<typeof useCompanyInfoModuleStore> = {
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
