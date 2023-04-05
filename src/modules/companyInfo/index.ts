import type { IOrderModule } from '@/modules/IOrderModule';
import { defineAsyncComponent } from 'vue';
import { useCompanyInfoModuleStore } from '@/modules/companyInfo/store';
import CompanyName from './pages/CompanyName.vue';
import CompanyAddress from './pages/CompanyAddress.vue';

export const companyInfo: IOrderModule = {
  startRoute: 'CompanyName',

  routes: [
    {
      path: 'company-name',
      name: 'CompanyName',
      component: CompanyName,
    },
    {
      path: 'company-address',
      name: 'CompanyAddress',
      component: CompanyAddress,
    },
  ],

  summaryItemComponent: defineAsyncComponent(() => import('./SummaryItem.vue')),

  useModuleStore: useCompanyInfoModuleStore,
};
