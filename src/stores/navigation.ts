import { defineStore } from 'pinia';
import type {
  RouteLocationNormalizedLoaded,
  RouteRecordName,
  RouteRecordRaw,
} from 'vue-router';
import { useRouter } from 'vue-router';
import { computed, ref, shallowRef, toRaw } from 'vue';
import type { IOrderFlow } from '@/flows/IOrderFlow';
import type { IOrderModule, IOrderReviewModule } from '@/modules/IOrderModule';
import { buildFlowDefaultRoute } from '@/flows/buildOrderFlow';
import { companyInfo } from '@/modules/companyInfo';

// TMP 

import ReviewRoute from '../flows/trademark/ReviewRoute.vue';









export const useNavigationStore = defineStore('navigation', () => {
  const router = useRouter();

  const currentFlow = ref<IOrderFlow>();
  const currentModuleIndex = ref(0);
  const currentIntroModules = shallowRef<IOrderModule[]>([]);
  const currentOrderModules = shallowRef<IOrderModule[]>([]);
  const currentReviewModules = shallowRef<IOrderReviewModule[]>([]);

  const introModulesFinished = ref(false);

  const currentModules = computed(() => {
    return [
      ...currentIntroModules.value,
      ...currentOrderModules.value,
      ...currentReviewModules.value,
    ];
  });

  const currentModuleByRoute = computed(() => {
    // This will react to route change with web browser buttons
    const route = router.currentRoute;
    const routeName = getRouteNameWithoutFlow(route.value);
    const currModule = currentModules.value.find(m => m.routes.find(r => r.name === routeName));
    return currModule;
  });

  const currentModule = computed(() => currentModules.value[currentModuleIndex.value]);

  const loadFlow = (flow: IOrderFlow) => {
    console.log("Loading flow!");
    if (currentFlow.value) {
      const originalFlowRoute = buildFlowDefaultRoute(currentFlow.value);
      router.addRoute(originalFlowRoute);
    }
    currentFlow.value = flow;
    currentIntroModules.value = flow.introModules;
    introModulesFinished.value = false;

    // Initialize stores
    flow.introModules.forEach(m => m.useModuleStore().initialize());

    console.log("Flow loaded!");

    // Add check if route exists or maybe this can be handled by 404 route
    if (router.currentRoute.value.matched.length > 1) return;
    console.log("No refresh detected, redirecting to first intro route...");
    currentModuleIndex.value = 0;

    return router.push({
      name: getRouteName(currentModule.value?.startRoute),
    });
  }

  const loadOrderModules = async () => {
    // router.replace triggers whole route rerender so this method is triggered twice when user enters it after intro modules
    // Thats why this needs to be cancelled
    if (introModulesFinished.value) return;
    console.log("Loading rest of the modules...");

    // Get data from intro modules
    // const introModulesData = currentIntroModules.value.map(m => m.useModuleStore());
    // console.log(toRaw(introModulesData[0]));
    // Make request based on data and recive modules
    const orderModules = [companyInfo];

    // Assign new modules to orderModules ref
    currentOrderModules.value = orderModules;

    // Remove catch all route (Vue dev tools doesnt handle this right but route is deleted)
    const flowName = String(currentFlow.value?.name); // This can return string 'undefinied' so we need to add here some error handling
    router.removeRoute(flowName + 'OrderCatch'); // Order catch need to be hardcoded, this is defined in buildOrderFlow

    // Initialize modules stores
    orderModules.forEach(m => m.useModuleStore().initialize());

    // Add modules routes
    const reviewModules = currentFlow.value!.reviewModules;
    currentReviewModules.value = reviewModules;
    const orderRouteName = flowName + 'Order';
    const prebuiltOrderRoutes = buildChildrenRoutes([...orderModules, ...reviewModules], flowName);
    prebuiltOrderRoutes.forEach(r => router.addRoute(orderRouteName, r));
    //console.log(router.getRoutes());

    // State update
    console.log("All modules loaded!");
    introModulesFinished.value = true;

    // Check if requested route exists
    const { requestedExistingRoute } = await checkRequestedRoute();

    if (requestedExistingRoute) return;
    console.log("Requested order route doesnt exist! Redirecting to first order module!");

    const firstOrderModule = orderModules[0];
    return router.push({
      name: getRouteName(firstOrderModule.startRoute)
    });
  };

  const checkRequestedRoute = async () => {
    // When new routes are loaded route needs to be replaced so router can match right route
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
      return {
        requestedExistingRoute: true
      }
    }

    return {
      requestedExistingRoute: false
    };
  }

  const getRouteNameWithoutFlow = (route: RouteLocationNormalizedLoaded): string => {
    return (
      route.name
        ?.toString()
        .replace(currentFlow.value?.name.toString() ?? '', '') ?? ''
    );
  };


  // This func creates proper route name based on default route name from module and flow name.
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

    if (!introModulesFinished.value && currentModuleIndex.value === currentModules.value.length - 1) {
      return router.push({ name: String(currentFlow.value.name) + 'OrderCatch', params: { catchAll: 'order-start' } });
    }

    currentModuleIndex.value += 1;
    return router.push({
      name: getRouteName(currentModule.value.startRoute),
    });
  };

  return {
    loadFlow,
    loadOrderModules,
    pushModulePage,
    nextModule,

    currentOrderModules,



    // Diag
    currentModule,
    currentModuleByRoute,
    currentModules,
    currentIntroModules,


    // TODO: Find a good name for this
    // orderModules: computed(() => [
    //   ...currentIntroModules.value,
    //   ...currentOrderModules.value,
    // ]),
    //buildIntroRoutes,
  };
});


// Core functions

function buildChildrenRoutes(modules: IOrderModule[] | IOrderReviewModule[], flowName: string) {
  const defaultRoutes = modules.flatMap(m => m.routes);
  const prebuiltRoutes = defaultRoutes.map(r => { return { ...r, name: flowName + String(r.name) } });
  return prebuiltRoutes;
}



// Some check needed
function buildFlowRoutes(
  type: 'Intro' | 'Order',
  flow: IOrderFlow,
  layoutComponent: RouteRecordRaw['component'],
  modules: IOrderModule[],
): RouteRecordRaw {
  const childRoutes = modules.flatMap((m) =>
    prefixRoutes(m.routes, flow.name),
  );

  return {
    path: `${flow.path}/${type.toLowerCase()}`,
    name: String(flow.name) + type,
    component: layoutComponent,
    children: childRoutes,
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









// const buildIntroRoutes = async (modules: IOrderModule[], flow: IOrderFlow) => {
//   if (currentFlow.value) {
//     const originalFlowRoute = buildFlowDefaultRoute(currentFlow.value);
//     router.addRoute(originalFlowRoute);
//   }
//   currentFlow.value = flow;
//   currentIntroModules.value = modules;
//   const flowRoutes = buildFlowRoutes('Intro', flow, flow.layoutComponent, modules);
//   router.addRoute(flow.name, flowRoutes);

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

//   currentModuleIndex.value = 0;
//   return router.push({
//     name: getRouteName(currentModule.value?.startRoute),
//   });
// }



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