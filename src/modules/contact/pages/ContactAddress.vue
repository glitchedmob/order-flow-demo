<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigation';
import { useContactStore } from '@/modules/contact/store';

const navigationStore = useNavigationStore();
const contactStore = useContactStore();
</script>
<template>
  <label>
    Contact Address
    <input type="text" v-model="contactStore.address" />
  </label>

  <button @click="navigationStore.nextModule()">Next</button>
</template>
