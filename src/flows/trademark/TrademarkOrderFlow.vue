<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { trademarkOrderFlow } from '@/flows/trademark';
import { useNavigationStore } from '@/stores/navigation';
import type { IOrderModuleStore } from '@/modules/IOrderModule';
import { companyInfo } from '@/modules/companyInfo';
import { contact } from '@/modules/contact';

const moduleStores = ref<IOrderModuleStore[]>([]);

const navigationStore = useNavigationStore();

onMounted(() => {
  moduleStores.value.forEach((store) => store.initialize());

  const modules = [companyInfo, contact];

  navigationStore.loadFlow(trademarkOrderFlow, modules);

  moduleStores.value = modules.map((m) => m.useModuleStore());
  moduleStores.value.forEach((store) => store.initialize());
});
</script>
<template>
  <h1>TrademarkOrderFlow</h1>
  <RouterView />
</template>
