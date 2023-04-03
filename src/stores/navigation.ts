import { defineStore } from 'pinia';
import type {
  RouteLocationNormalizedLoaded,
  RouteRecordName,
  RouteRecordRaw,
} from 'vue-router';
import { useRouter } from 'vue-router';
import { computed, ref, shallowRef } from 'vue';
import type { IOrderFlow } from '@/flows/IOrderFlow';
import type { IOrderModule, IOrderReviewModule } from '@/modules/IOrderModule';
import { buildFlowDefaultRoute } from '@/flows/buildOrderFlow';


// introModules: IOrderModule[];
// reviewModules: IOrderReviewModule[];

// Example of final routing object. This needs to be dynamically built by the navigation store
const routes = [
  {
    component: 'layout component', // fetch app/getStarted config
    children: [
      // introRoutes from introModules.
      {
        component: 'orderLayout component', // fetch order config
        children: [
          // catch all route to be removed after order config fetched and order modules loaded
          // orderRoutes from dynamic orderModules
          // reviewRoutes from reviewModules
        ],
      },
    ],
  },
];

// Note: When the navigationStore is on the last introModule and is asked to go the nextModule
// it needs to navigate to some url (I think /order-start or something along those lines) that
// will be caught by the catch-all under the orderLayout component then after the orderLayout
// fetches the orderConfig and loads in the dynamic orderModules it needs to redirect to
// the first orderModule



export const useNavigationStore = defineStore('navigation', () => {
  const router = useRouter();

  const currentFlow = ref<IOrderFlow>();
  const currentModuleIndex = ref(0);

  const currentIntroModules = shallowRef<IOrderModule[]>([]);
  const currentOrderModules = shallowRef<IOrderModule[]>([]);
  const currentReviewModules = shallowRef<IOrderReviewModule[]>([]);


  const buildIntroRoutes = (modules: IOrderModule[], flow: IOrderFlow) => {
    if (currentFlow.value) {
      const originalFlowRoute = buildFlowDefaultRoute(currentFlow.value);
      router.addRoute(originalFlowRoute);
    }
    currentIntroModules.value = modules;
    const flowRoutes = buildFlowRoutes(flow, flow.layoutComponent, modules);
    router.addRoute(flowRoutes);
    const firstChild: RouteRecordRaw = flowRoutes.children![0];
    router.push({ name: firstChild.name });
  }

  const currentModules = computed(() => {
    return [
      ...currentIntroModules.value,
      ...currentOrderModules.value,
      ...currentReviewModules.value,
    ];
  });
































  // const currentModule = computed(
  //   () => currentModules.value[currentModuleIndex.value],
  // );

  // const getRouteName = (name?: string): string | undefined => {
  //   if (!currentFlow.value) {
  //     return;
  //   }

  //   return (currentFlow.value.route.name?.toString() ?? '') + name;
  // };

  // // const getModuleFromRoute = (
  // //   route: RouteLocationNormalizedLoaded,
  // // ): IOrderModule | undefined => {
  // //   const routeNameWithoutFlow = getRouteNameWithoutFlow(route);

  // //   return currentModules.value.find((m) => {
  // //     const routeNames = m.routes.map((route) => route.name?.toString());

  // //     return routeNames.includes(routeNameWithoutFlow);
  // //   });
  // // };

  // const getRouteNameWithoutFlow = (route: RouteLocationNormalizedLoaded): string => {
  //   return (
  //     route.name
  //       ?.toString()
  //       .replace(currentFlow.value?.name.toString() ?? '', '') ?? ''
  //   );
  // };

  // const loadFlow = async (flow: IOrderFlow, modules: IOrderModule[]) => {
  //   if (currentFlow.value) {
  //     const originalFlowRoute = buildFlowDefaultRoute(currentFlow.value);
  //     router.addRoute(originalFlowRoute);
  //   }

  //   currentFlow.value = flow;
  //   currentModules.value = modules;

  //   const flowRoutes = buildFlowRoutes(flow, modules);
  //   router.addRoute(flowRoutes);

  //   // Trigger a rerender and update current route once new routes are loaded
  //   await router.replace({
  //     path: router.currentRoute.value.path,
  //     query: router.currentRoute.value.query,
  //   });

  //   const activeModule = getModuleFromRoute(router.currentRoute.value);
  //   const activeModuleIndex = activeModule
  //     ? currentModules.value.indexOf(activeModule)
  //     : -1;

  //   if (activeModule && activeModuleIndex !== -1) {
  //     currentModuleIndex.value = activeModuleIndex;
  //     return;
  //   }

  //   if (getRouteNameWithoutFlow(router.currentRoute.value) === 'Summary') {
  //     currentModuleIndex.value = currentModules.value.length - 1;
  //     return;
  //   }

  //   currentModuleIndex.value = 0;
  //   return router.replace({
  //     name: getRouteName(currentModule.value?.startRoute),
  //   });
  // };

  // const loadOrderModules = (orderModules: IOrderModule[]) => {
  //   // TODO: build this
  // };

  // const nextModule = () => {
  //   if (!currentModule.value || !currentFlow.value) {
  //     return;
  //   }

  //   if (currentModuleIndex.value === currentModules.value.length - 1) {
  //     return router.push({ name: getRouteName('Summary') });
  //   }

  //   currentModuleIndex.value += 1;

  //   return router.replace({
  //     name: getRouteName(currentModule.value.startRoute),
  //   });
  // };

  // const pushModulePage = (name: string) => {
  //   const routeName = getRouteName(name);

  //   if (!routeName) {
  //     return Promise.reject('no loaded module');
  //   }

  //   return router.push({ name: getRouteName(name) });
  // };

  return {
    buildIntroRoutes,
    currentIntroModules

    // loadFlow,
    // loadOrderModules,
    // nextModule,
    // pushModulePage,
    // currentModules,
    // // TODO: Find a good name for this
    // orderModules: computed(() => [
    //   ...currentIntroModules.value,
    //   ...currentOrderModules.value,
    // ]),
  };
});

























function buildFlowRoutes(
  flow: IOrderFlow,
  layoutComponent: RouteRecordRaw['component'],
  modules: IOrderModule[],
): RouteRecordRaw {
  const childRoutes = modules.flatMap((m) =>
    prefixRoutes(m.routes, flow.path, flow.name),
  );

  return {
    path: flow.path,
    name: flow.name,
    component: layoutComponent,
    children: childRoutes,
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
