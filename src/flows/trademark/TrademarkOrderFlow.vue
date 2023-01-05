<script setup lang="ts">
import { onMounted } from 'vue';
import { trademarkOrderFlow } from '@/flows/trademark';
import { useNavigationStore } from '@/stores/navigation';

const moduleStores = trademarkOrderFlow.modules.map((m) => m.useModuleStore());

const navigationStore = useNavigationStore();

onMounted(() => {
  moduleStores.forEach((store) => store.initialize());

  navigationStore.loadFlow(trademarkOrderFlow);
});
</script>
<template>
  <h1>TrademarkOrderFlow</h1>
  <RouterView />
</template>
