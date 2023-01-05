<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigation';
import { useContactStore } from '@/modules/contact/store';

const navigationStore = useNavigationStore();
const contactStore = useContactStore();
</script>
<template>
  <label>
    Contact Name
    <input type="text" v-model="contactStore.name" />
  </label>

  <button @click="navigationStore.pushModulePage('ContactAddress')">
    Next
  </button>
</template>
