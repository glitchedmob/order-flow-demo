<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { formationOrderFlow } from '@/flows/formation';
import { useNavigationStore } from '@/stores/navigation';
import type { IOrderModuleStore } from '@/modules/IOrderModule';
import { contact } from '@/modules/contact';
import { companyInfo } from '@/modules/companyInfo';
import { registeredAgent } from '@/modules/registeredAgent';
import { wait } from '@/utils';

const moduleStores = ref<IOrderModuleStore[]>([]);

const navigationStore = useNavigationStore();

const isLoading = ref(true);

const fetchConfig = async () => {
  await wait(500);

  isLoading.value = false;

  return [contact, companyInfo, registeredAgent];
};

onMounted(async () => {
  const modules = await fetchConfig();

  navigationStore.loadFlow(formationOrderFlow, modules);

  moduleStores.value = modules.map((m) => m.useModuleStore());
  moduleStores.value.forEach((store) => store.initialize());
});
</script>
<template>
  <h1>FormationOrderFlow</h1>
  <p v-if="isLoading">Loading...</p>
  <RouterView />
</template>
