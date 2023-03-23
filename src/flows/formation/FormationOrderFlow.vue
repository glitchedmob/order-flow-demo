<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { formationOrderFlow } from '@/flows/formation';
import { useNavigationStore } from '@/stores/navigation';
import type { IOrderModuleStore } from '@/modules/IOrderModule';
import { contact } from '@/modules/contact';
import { companyInfo } from '@/modules/companyInfo';
import { registeredAgent } from '@/modules/registeredAgent';

const moduleStores = ref<IOrderModuleStore[]>([]);

const navigationStore = useNavigationStore();

onMounted(() => {
  const modules = [contact, companyInfo, registeredAgent];

  navigationStore.loadFlow(formationOrderFlow, modules);

  moduleStores.value = modules.map((m) => m.useModuleStore());
  moduleStores.value.forEach((store) => store.initialize());
});
</script>
<template>
  <h1>FormationOrderFlow</h1>
  <RouterView />
</template>
