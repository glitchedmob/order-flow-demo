import type { IOrderModule, IOrderReviewModule } from '@/modules/IOrderModule';
import type { RouteRecordName, RouteRecordRaw } from 'vue-router';

export interface IOrderFlow {
  path: string;
  name: RouteRecordName;
  introModules: IOrderModule[];
  reviewModules: IOrderReviewModule[];
  layoutComponent: RouteRecordRaw['component'];
  orderLayoutComponent: RouteRecordRaw['component'];
  route: RouteRecordRaw;
}


