<script setup lang="ts">
import { useContactStore } from '@/modules/contact/store';

const contactStore = useContactStore();
</script>
<template>
  <label>
    Address
    <input type="text" v-model="contactStore.address" />
  </label>
</template>
