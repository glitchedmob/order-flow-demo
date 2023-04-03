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
import { companyInfo } from '@/modules/companyInfo';


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

  const orderLoaded = ref(false);

  const currentIntroModules = shallowRef<IOrderModule[]>([]);
  const currentOrderModules = shallowRef<IOrderModule[]>([]);
  const currentReviewModules = shallowRef<IOrderReviewModule[]>([]);


  const buildIntroRoutes = async (modules: IOrderModule[], flow: IOrderFlow) => {
    if (currentFlow.value) {
      const originalFlowRoute = buildFlowDefaultRoute(currentFlow.value);
      router.addRoute(originalFlowRoute);
    }
    currentFlow.value = flow;
    currentIntroModules.value = modules;
    const flowRoutes = buildFlowRoutes(flow, flow.layoutComponent, modules);
    router.addRoute(flowRoutes);

    // Trigger a rerender and update current route once new routes are loaded
    await router.replace({
      path: router.currentRoute.value.path,
      query: router.currentRoute.value.query,
    });

    const activeModule = getModuleFromRoute(router.currentRoute.value);
    const activeModuleIndex = activeModule
      ? currentModules.value.indexOf(activeModule)
      : -1;

    if (activeModule && activeModuleIndex !== -1) {
      currentModuleIndex.value = activeModuleIndex;
      return;
    }

    currentModuleIndex.value = 0;
    return router.push({
      name: getRouteName(currentModule.value?.startRoute),
    });
  }

  const currentModules = computed(() => {
    return [
      ...currentIntroModules.value,
      ...currentOrderModules.value,
      ...currentReviewModules.value,
    ];
  });

  const loadOrderModules = async () => {
    const introModulesData = currentIntroModules.value.map(m => m.useModuleStore());
    // We can get right data here and load right order config
    // TMP
    const orderModules = [companyInfo];

    currentOrderModules.value = orderModules;
    const orderRoutes = orderModules.flatMap(m => m.routes);
    const newRoutes = prefixRoutes(orderRoutes, currentFlow.value?.name);
    const parentRoute = currentFlow.value?.name as string;

    router.addRoute(parentRoute, {
      path: 'order',
      name: `Order`,
      component: currentFlow.value?.orderLayoutComponent,
      children: newRoutes,
    });

    orderLoaded.value = true;
    nextModule();
  };

  const getRouteNameWithoutFlow = (route: RouteLocationNormalizedLoaded): string => {
    return (
      route.name
        ?.toString()
        .replace(currentFlow.value?.name.toString() ?? '', '') ?? ''
    );
  };


  const getRouteName = (name?: string): string | undefined => {
    if (!currentFlow.value) {
      return;
    }

    return (currentFlow.value.route.name?.toString() ?? '') + name;
  };


  const getModuleFromRoute = (
    route: RouteLocationNormalizedLoaded,
  ): IOrderModule | IOrderReviewModule | undefined => {
    const routeNameWithoutFlow = getRouteNameWithoutFlow(route);

    return currentModules.value.find((m) => {
      const routeNames = m.routes.map((route) => route.name?.toString());

      return routeNames.includes(routeNameWithoutFlow);
    });
  };


  const currentModule = computed(
    () => currentModules.value[currentModuleIndex.value],
  );


  const pushModulePage = (name: string) => {
    const routeName = getRouteName(name);

    if (!routeName) {
      return Promise.reject('no loaded module');
    }

    return router.push({ name: getRouteName(name) });
  };


  const nextModule = () => {
    if (!currentModule.value || !currentFlow.value) {
      return;
    }

    if (!orderLoaded.value && currentModuleIndex.value === currentModules.value.length - 1) {
      return loadOrderModules();
    }

    currentModuleIndex.value += 1;
    return router.push({
      name: getRouteName(currentModule.value.startRoute),
    });
  };

  return {
    buildIntroRoutes,
    loadOrderModules,
    pushModulePage,
    nextModule,

    currentIntroModules,
    currentModules,
    currentOrderModules
    // loadFlow,
    // loadOrderModules,
    // TODO: Find a good name for this
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
    prefixRoutes(m.routes, flow.name),
  );

  return {
    path: flow.path,
    name: flow.name,
    component: layoutComponent,
    children: [...childRoutes],
  };
}

function prefixRoutes(
  routes: RouteRecordRaw[],
  namePrefix?: RouteRecordName,
): RouteRecordRaw[] {
  return routes.map((route) => {
    const { path, name, ...rest } = route;
    return {
      path: path,
      name: (namePrefix?.toString() ?? '') + (name?.toString() ?? ''),
      ...rest,
    };
  });
}
