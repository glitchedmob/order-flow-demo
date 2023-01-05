<script setup lang="ts">
import { computed } from 'vue';
import { mainOrderFlow } from '@/flows/main/index';

const moduleStores = mainOrderFlow.modules.map((m) => m.useModuleStore());

const isValid = computed(() => moduleStores.every((store) => store.isValid));
</script>

<template>
  <h2>Summary</h2>

  <template v-for="(m, index) in mainOrderFlow.modules" :key="index">
    <component :is="m.summaryItemComponent" />
  </template>

  <p>All stores valid: {{ isValid ? 'true' : 'false' }}</p>
</template>
