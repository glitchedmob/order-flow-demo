import type { RouteRecordName, RouteRecordRaw } from 'vue-router';

export interface IOrderFlow {
  path: string;
  name: RouteRecordName;
  layoutComponent: RouteRecordRaw['component'];
  orderLayoutComponent: RouteRecordRaw['component'];
  route: RouteRecordRaw;
}


