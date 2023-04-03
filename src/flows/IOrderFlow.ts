import type { RouteRecordName, RouteRecordRaw } from 'vue-router';
// import type { IOrderModule, IOrderReviewModule } from '@/modules/IOrderModule';

export interface IOrderFlow {
  path: string;
  name: RouteRecordName;
  layoutComponent: RouteRecordRaw['component'];
  orderLayoutComponent: RouteRecordRaw['component'];
  route: RouteRecordRaw;
}


