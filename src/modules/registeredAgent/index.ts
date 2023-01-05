import type { IOrderModule } from '@/modules/IOrderModule';
import { defineAsyncComponent } from 'vue';
import { useRegisteredAgentStore } from '@/modules/registeredAgent/store';

export const registeredAgent: IOrderModule = {
  startRoute: 'RegisteredAgent',

  routes: [
    {
      path: '/registered-agent',
      name: 'RegisteredAgent',
      component: () => import('./pages/RegisteredAgent.vue'),
    },
  ],

  summaryItemComponent: defineAsyncComponent(() => import('./SummaryItem.vue')),

  useModuleStore: useRegisteredAgentStore,
};
