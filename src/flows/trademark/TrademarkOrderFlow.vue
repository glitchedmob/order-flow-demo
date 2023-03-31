<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { trademarkOrderFlow } from '@/flows/trademark';
import { useNavigationStore } from '@/stores/navigation';
import type { IOrderModuleStore } from '@/modules/IOrderModule';
import { companyInfo } from '@/modules/companyInfo';
import { contact } from '@/modules/contact';
import { wait } from '@/utils';

const moduleStores = ref<IOrderModuleStore[]>([]);

const navigationStore = useNavigationStore();

const isLoading = ref(true);

const fetchConfig = async () => {
  await wait(500);

  isLoading.value = false;

  return [contact, companyInfo];
};

onMounted(async () => {
  const modules = await fetchConfig();

  navigationStore.loadFlow(trademarkOrderFlow, modules);

  moduleStores.value = modules.map((m) => m.useModuleStore());
  moduleStores.value.forEach((store) => store.initialize());
});
</script>
<template>
  <h1>TrademarkOrderFlow</h1>
  <p v-if="isLoading">Loading...</p>
  <RouterView v-if="isLoading" />
</template>
