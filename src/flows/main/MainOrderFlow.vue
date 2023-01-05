<script setup lang="ts">
import { onMounted } from 'vue';
import { main } from '@/flows/main/index';
import { useNavigationStore } from '@/stores/navigation';

const moduleStores = main.modules.map((m) => m.useModuleStore());

const navigationStore = useNavigationStore();

onMounted(() => {
  moduleStores.forEach((store) => store.initialize());

  navigationStore.loadFlow(main);
});
</script>
<template>
  <h1>MainOrderFlow</h1>
  <RouterView />
</template>
