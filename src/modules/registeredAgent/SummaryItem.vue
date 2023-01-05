<script setup lang="ts">
import { useRegisteredAgentStore } from '@/modules/registeredAgent/store';

const registeredAgentStore = useRegisteredAgentStore();
</script>

<template>
  <h3>Registered Agent Summary</h3>

  <label>
    Get Registered Agent?
    <input type="checkbox" v-model="registeredAgentStore.getRegisteredAgent" />
  </label>
</template>
