import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import type { IOrderFlow } from '@/flows/IOrderFlow';

export const useNavigationStore = defineStore('navigation', () => {
  const router = useRouter();

  const currentFlow = ref<IOrderFlow>();
  const currentModuleIndex = ref(0);
  const currentModule = computed(
    () => currentFlow.value?.modules[currentModuleIndex.value],
  );

  const getRouteName = (name?: string): string | undefined => {
    if (!currentFlow.value) {
      return;
    }

    return (currentFlow.value.route.name?.toString() ?? '') + name;
  };

  const loadFlow = (flow: IOrderFlow) => {
    currentFlow.value = flow;
    currentModuleIndex.value = 0;

    return router.replace({
      name: getRouteName(currentModule.value?.startRoute),
    });
  };

  const nextModule = () => {
    if (!currentModule.value || !currentFlow.value) {
      return;
    }

    if (currentModuleIndex.value === currentFlow.value.modules.length - 1) {
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

  return { loadFlow, nextModule, pushModulePage };
});
