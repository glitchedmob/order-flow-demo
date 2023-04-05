<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigation';
import { useContactStore } from '@/modules/contact/store';

const navigationStore = useNavigationStore();
const contactStore = useContactStore();
</script>
<template>
  <label>
    ThankYou
    <input type="text" v-model="contactStore.name" />
  </label>

  <button @click="() => navigationStore.nextModule()">Next</button>
</template>
