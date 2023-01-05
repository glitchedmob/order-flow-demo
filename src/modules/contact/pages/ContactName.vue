<script setup lang="ts">
import { useContactStore } from '@/modules/contact/store';

const contactStore = useContactStore();
</script>
<template>
  <label>
    Name
    <input type="text" v-model="contactStore.name" />
  </label>
</template>
