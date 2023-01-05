import type { IOrderModule } from '@/types/IOrderModule';
import type { RouteRecord, RouteRecordName, RouteRecordRaw } from 'vue-router';

export interface IOrderFlowArgs {
  modules: IOrderModule[];
  route: Omit<RouteRecordRaw, 'children'>;
}

export interface IOrderFlow {
  modules: IOrderModule[];
  route: RouteRecordRaw;
}

export function buildOrderFlow({ modules, route }: IOrderFlowArgs): IOrderFlow {
  return {
    modules,
    route: {
      path: route.path,
      name: route.name,
      component: route.component,
      children: modules.flatMap((m) =>
        prefixRoutes(m.routes, route.path, route.name),
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
