<script setup lang="ts">
import { computed } from 'vue';
import { useNavigationStore } from '@/stores/navigation';

const navigationStore = useNavigationStore();

const moduleStores = navigationStore.currentModules.map((m) =>
  m.useModuleStore(),
);

const isValid = computed(() => moduleStores.every((store) => store.isValid));
</script>

<template>
  <h2>Summary</h2>

  <template v-for="(m, index) in navigationStore.currentModules" :key="index">
    <component :is="m.summaryItemComponent" />
  </template>

  <p>All stores valid: {{ isValid ? 'true' : 'false' }}</p>
</template>
