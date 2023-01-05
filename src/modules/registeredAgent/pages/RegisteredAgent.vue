<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigation';
import { useRegisteredAgentStore } from '@/modules/registeredAgent/store';

const navigationStore = useNavigationStore();
const registeredAgentStore = useRegisteredAgentStore();
</script>
<template>
  <label>
    Get Registered Agent?
    <input type="checkbox" v-model="registeredAgentStore.getRegisteredAgent" />
  </label>

  <button @click="navigationStore.nextModule()">Next</button>
</template>
