<script setup lang="ts">
import { main } from '@/flows/main/index';

const moduleStores = main.modules.map((m) => m.useModuleStore());

const isValid = moduleStores.every((store) => store.isValid);
</script>

<template>
  <h2>Summary</h2>

  <template v-for="(m, index) in main.modules" :key="index">
    <component :is="m.summaryItemComponent" />
  </template>

  <p>All stores valid: {{ isValid ? 'true' : 'false' }}</p>
</template>
