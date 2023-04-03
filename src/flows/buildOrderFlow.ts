import type { RouteRecordName, RouteRecordRaw } from 'vue-router';
import type { IOrderFlow } from '@/flows/IOrderFlow';
import CatchAll from '@/components/CatchAll.vue';

export interface IOrderFlowArgs {
  path: string;
  name: RouteRecordName;
  layoutComponent: RouteRecordRaw['component'];
  orderLayoutComponent: RouteRecordRaw['component'];
}

export function buildOrderFlow({
  path,
  name,
  layoutComponent,
  orderLayoutComponent,
}: IOrderFlowArgs): IOrderFlow {
  return {
    path,
    name,
    layoutComponent,
    orderLayoutComponent,
    route: buildFlowDefaultRoute({ path, name, layoutComponent }),
  };
}

export function buildFlowDefaultRoute({
  path,
  name,
  layoutComponent,
}: Pick<IOrderFlowArgs, 'path' | 'name' | 'layoutComponent'>): RouteRecordRaw {
  return {
    path: path,
    name: name,
    component: layoutComponent,
    children: [
      {
        path: ':catchAll(.*)',
        name: `${name.toString()}CatchAll`,
        component: CatchAll,
      },
    ],
  };
}