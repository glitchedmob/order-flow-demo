import type { IOrderModule } from '@/modules/IOrderModule';
import type { RouteRecordName, RouteRecordRaw } from 'vue-router';
import type { IOrderFlow } from '@/flows/IOrderFlow';

export interface IOrderFlowArgs {
  modules: IOrderModule[];
  route: Omit<RouteRecordRaw, 'children'>;

  summaryComponent: NonNullable<RouteRecordRaw['component']>;
}

export function buildOrderFlow({
  modules,
  route,
  summaryComponent,
}: IOrderFlowArgs): IOrderFlow {
  const summaryRoute: RouteRecordRaw = {
    path: '/summary',
    name: 'Summary',
    component: summaryComponent,
  };

  return {
    modules,
    route: {
      path: route.path,
      name: route.name,
      component: route.component,
      children: modules.flatMap((m) =>
        prefixRoutes([...m.routes, summaryRoute], route.path, route.name),
      ),
    },
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
