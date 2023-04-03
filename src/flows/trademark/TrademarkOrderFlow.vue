<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useNavigationStore } from '@/stores/navigation';
import { companyInfo } from '@/modules/companyInfo';
import type { IOrderModuleStore } from '@/modules/IOrderModule';

import { wait } from '@/utils';


const moduleStores = ref<IOrderModuleStore[]>([]);
const navigationStore = useNavigationStore();
const isLoading = ref(true);

const fetchConfig = async () => {
  
  // moduleStores.value = navigationStore.currentIntroModules.map((m) =>
  //   m.useModuleStore(),
  // );

  // // We can get somehow data and load next modules
  // // moduleStores.value
  // await wait(500);

  // isLoading.value = false;
  // return [companyInfo];
};

onMounted(async () => {
  console.log('OrderFlow mounted!');
  // const orderModules = await fetchConfig();
  // navigationStore.loadOrderModules(orderModules);
});
</script>
<template>
  <h1>TrademarkOrderFlow</h1>
  <p v-if="isLoading">Loading...</p>
  <RouterView v-if="isLoading" />
</template>
