import { defineStore } from 'pinia';
import type { RouteRecordName, RouteRecordRaw } from 'vue-router';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import type { IOrderFlow } from '@/flows/IOrderFlow';
import type { IOrderModule } from '@/modules/IOrderModule';
import { buildFlowDefaultRoute } from '@/flows/buildOrderFlow';

export const useNavigationStore = defineStore('navigation', () => {
  const router = useRouter();

  const currentFlow = ref<IOrderFlow>();
  const currentModuleIndex = ref(0);
  const currentModules = ref<IOrderModule[]>([]);
  const currentModule = computed(
    () => currentModules.value[currentModuleIndex.value],
  );

  const getRouteName = (name?: string): string | undefined => {
    if (!currentFlow.value) {
      return;
    }

    return (currentFlow.value.route.name?.toString() ?? '') + name;
  };

  const loadFlow = async (flow: IOrderFlow, modules: IOrderModule[]) => {
    if (currentFlow.value) {
      const originalFlowRoute = buildFlowDefaultRoute(currentFlow.value);
      router.addRoute(originalFlowRoute);
    }

    currentFlow.value = flow;
    currentModules.value = modules;
    currentModuleIndex.value = 0;

    const flowRoutes = buildFlowRoutes(flow, modules);
    router.addRoute(flowRoutes);

    await router.replace({
      path: router.currentRoute.value.path,
      query: router.currentRoute.value.query,
    });

    const currentRoute = router.currentRoute.value.name;

    if (currentRoute && router.hasRoute(currentRoute)) {
      return;
    }

    return router.replace({
      name: getRouteName(currentModule.value?.startRoute),
    });
  };

  const nextModule = () => {
    if (!currentModule.value || !currentFlow.value) {
      return;
    }

    if (currentModuleIndex.value === currentModules.value.length - 1) {
      return router.push({ name: getRouteName('Summary') });
    }

    currentModuleIndex.value += 1;

    return router.replace({
      name: getRouteName(currentModule.value.startRoute),
    });
  };

  const pushModulePage = (name: string) => {
    const routeName = getRouteName(name);

    if (!routeName) {
      return Promise.reject('no loaded module');
    }

    return router.push({ name: getRouteName(name) });
  };

  return {
    loadFlow,
    nextModule,
    pushModulePage,
    currentModules: computed(() => currentModules.value),
  };
});

function buildFlowRoutes(
  flow: IOrderFlow,
  modules: IOrderModule[],
): RouteRecordRaw {
  const childRoutes = modules.flatMap((m) =>
    prefixRoutes(m.routes, flow.path, flow.name),
  );

  return {
    path: flow.path,
    name: flow.name,
    component: flow.layoutComponent,
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
