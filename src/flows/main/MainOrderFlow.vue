<script setup lang="ts">
import { onMounted } from 'vue';
import { main } from '@/flows/main/index';

const moduleStores = main.modules.map((m) => m.useModuleStore());

onMounted(() => {
  moduleStores.forEach((store) => store.initialize());
});
</script>
<template>
  <h1>MainOrderFlow</h1>
  <RouterView />
</template>
