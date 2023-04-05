import type { RouteRecordName, RouteRecordRaw } from 'vue-router';
import type { IOrderFlow } from '@/flows/IOrderFlow';
import type { IOrderModule, IOrderReviewModule } from '@/modules/IOrderModule';
import FlowView from './FlowView.vue';
import OrderView from './OrderView.vue';

export interface IOrderFlowArgs {
  path: string;
  name: RouteRecordName;
  introModules: IOrderModule[];
  reviewModules: IOrderReviewModule[];
}

export function buildOrderFlow({
  path,
  name,
  introModules,
  reviewModules,
}: IOrderFlowArgs): IOrderFlow {
  return {
    path,
    name,
    introModules,
    reviewModules,
    route: buildFlowDefaultRoute({ path, name, introModules, reviewModules }),
  };
}

export function buildFlowDefaultRoute({
  path,
  name,
  introModules,
  reviewModules
}: Pick<IOrderFlowArgs, 'path' | 'name' | 'introModules' | 'reviewModules'>): RouteRecordRaw {
  const introRoutes = introModules.flatMap(m => m.routes);
  const introChildren = introRoutes.map(ch => {
    return {
      ...ch,
      name: String(name) + String(ch.name),
    }

  });

  return {
    path: path,
    name: name,
    component: FlowView,
    props: {
      orderFlow: {
        path,
        name,
        introModules,
        reviewModules,
        route: {
          path,
          name
        }
      }
    },
    children: [
      ...introChildren,
      {
        name: String(name) + "Order",
        path: 'order',
        component: OrderView,
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

