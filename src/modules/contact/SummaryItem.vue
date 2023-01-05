<script setup>
import { useContactModuleStore } from '@/modules/contact/store';

const contactStore = useContactModuleStore();
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
