<script setup lang="ts">
import { onMounted } from 'vue';
import { companyInfo } from '@/modules/companyInfo';
import { contact } from '@/modules/contact';
import { useNavigationStore } from '@/stores/navigation';
import { trademarkOrderFlow } from '.';

const naviagtionStore = useNavigationStore();

const fetchIntroModules = () => {
   return [contact, companyInfo];
}

onMounted(async () => {
  const modules = fetchIntroModules();
  naviagtionStore.buildIntroRoutes(modules, trademarkOrderFlow);
});
</script>
<template>
  <RouterView />
</template>
