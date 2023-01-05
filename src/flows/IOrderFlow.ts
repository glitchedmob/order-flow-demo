import type { IOrderModule } from '@/modules/IOrderModule';
import type { RouteRecordRaw } from 'vue-router';

export interface IOrderFlow {
  modules: IOrderModule[];
  route: RouteRecordRaw;
}
