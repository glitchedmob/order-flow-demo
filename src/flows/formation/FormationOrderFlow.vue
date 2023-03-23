<script setup lang="ts">
import { onMounted } from 'vue';
import { mainOrderFlow } from '@/flows/main';
import { useNavigationStore } from '@/stores/navigation';

const moduleStores = mainOrderFlow.modules.map((m) => m.useModuleStore());

const navigationStore = useNavigationStore();

onMounted(() => {
  moduleStores.forEach((store) => store.initialize());

  navigationStore.loadFlow(mainOrderFlow);
});
</script>
<template>
  <h1>MainOrderFlow</h1>
  <RouterView />
</template>
