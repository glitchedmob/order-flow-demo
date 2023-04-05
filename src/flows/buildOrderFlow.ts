import type { RouteRecordName, RouteRecordRaw } from 'vue-router';
import type { IOrderFlow } from '@/flows/IOrderFlow';
import type { IOrderModule, IOrderReviewModule } from '@/modules/IOrderModule';

export interface IOrderFlowArgs {
  path: string;
  name: RouteRecordName;
  introModules: IOrderModule[];
  reviewModules: IOrderReviewModule[];
  layoutComponent: RouteRecordRaw['component'];
  orderLayoutComponent: RouteRecordRaw['component'];
}

export function buildOrderFlow({
  path,
  name,
  layoutComponent,
  introModules,
  reviewModules,
  orderLayoutComponent,
}: IOrderFlowArgs): IOrderFlow {
  return {
    path,
    name,
    layoutComponent,
    orderLayoutComponent,
    introModules,
    reviewModules,
    route: buildFlowDefaultRoute({ path, name, layoutComponent, orderLayoutComponent, introModules }),
  };
}

export function buildFlowDefaultRoute({
  path,
  name,
  layoutComponent,
  orderLayoutComponent,
  introModules
}: Pick<IOrderFlowArgs, 'path' | 'name' | 'layoutComponent' | 'orderLayoutComponent' | 'introModules'>): RouteRecordRaw {

  const introRoutes = introModules.flatMap(m => m.routes);
  const introChildren = introRoutes.map(ch=>{
    return {
      ...ch,
      name: String(name) + String(ch.name),
    }

  });

  return {
    path: path,
    name: name,
    component: layoutComponent,
    children: [
      ...introChildren,
      {
        name: String(name) + "Order",
        path: 'order',
        component: orderLayoutComponent,
        children: [
          {
            name: String(name) + "OrderCatch",
            path: ':catchAll(.*)',
            component: { template: '' }
          }
        ]
      }
    ],
  };
}

