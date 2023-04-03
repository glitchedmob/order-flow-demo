<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { contact } from '@/modules/contact';
import { useNavigationStore } from '@/stores/navigation';
import { trademarkOrderFlow } from '.';

const naviagtionStore = useNavigationStore();
const isLoading = ref(true);

const fetchIntroModules = async () => {
  return [contact];
};

onMounted(async () => {
  const modules = await fetchIntroModules();

  await naviagtionStore.buildIntroRoutes(modules, trademarkOrderFlow);

  isLoading.value = false;
});
</script>
<template>
  <RouterView v-if="!isLoading" />
</template>
