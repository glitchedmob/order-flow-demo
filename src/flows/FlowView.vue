<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useNavigationStore } from '@/stores/navigation';
import type { IOrderFlow } from './IOrderFlow';

interface Props {
  orderFlow: IOrderFlow;
}

const naviagtionStore = useNavigationStore();
const isLoading = ref(true);
const props = defineProps<Props>();

onMounted(async () => {
  await naviagtionStore.loadFlow(props.orderFlow);
  isLoading.value = false;
});
</script>
<template>
  <RouterView v-if="!isLoading" />
</template>
