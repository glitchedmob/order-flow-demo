<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useNavigationStore } from '../../stores/navigation';

const navigationStore = useNavigationStore();

const isLoading = ref(true);

onMounted(async () => {
  console.log('Order flow mounted!');
  await navigationStore.loadOrderModules();
  isLoading.value = false;
});
</script>
<template>
  <h1>TrademarkOrderFlow</h1>
  <RouterView v-if="!isLoading" />
  <p v-else>Loading...</p>
</template>
