import type { RouteRecordName, RouteRecordRaw } from 'vue-router';
import type { IOrderFlow } from '@/flows/IOrderFlow';
import CatchAll from '@/components/CatchAll.vue';

export interface IOrderFlowArgs {
  path: string;
  name: RouteRecordName;
  layoutComponent: RouteRecordRaw['component'];
  summaryComponent?: NonNullable<RouteRecordRaw['component']>;
}

export function buildOrderFlow({
  path,
  name,
  layoutComponent,
  summaryComponent,
}: IOrderFlowArgs): IOrderFlow {
  // const summaryRoute: RouteRecordRaw = {
  //   path: '/summary',
  //   name: 'Summary',
  //   component: summaryComponent,
  // };

  return {
    path,
    name,
    layoutComponent,
    summaryComponent,
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
        path: '/:catchAll(.*)',
        name: `${name.toString()}CatchAll`,
        component: CatchAll,
      },
    ],
  };
}

function prefixRoutes(
  routes: RouteRecordRaw[],
  pathPrefix: string,
  namePrefix?: RouteRecordName,
): RouteRecordRaw[] {
  return routes.map((route) => {
    const { path, name, ...rest } = route;
    return {
      path: pathPrefix + path,
      name: (namePrefix?.toString() ?? '') + (name?.toString() ?? ''),
      ...rest,
    };
  });
}
