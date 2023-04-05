<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useNavigationStore } from '@/stores/navigation';
import { trademarkOrderFlow } from '.';

const naviagtionStore = useNavigationStore();
const isLoading = ref(true);

onMounted(async () => {
  await naviagtionStore.loadFlow(trademarkOrderFlow)
  isLoading.value = false;
});
</script>
<template>
  <RouterView v-if="!isLoading" />
</template>
