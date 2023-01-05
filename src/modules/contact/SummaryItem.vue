<script setup lang="ts">
import { useContactStore } from '@/modules/contact/store';

const contactStore = useContactStore();
</script>

<template>
  <h3>Contact Summary</h3>

  <label>
    Address
    <input type="text" v-model="contactStore.address" />
  </label>

  <label>
    Name
    <input type="text" v-model="contactStore.name" />
  </label>
</template>
