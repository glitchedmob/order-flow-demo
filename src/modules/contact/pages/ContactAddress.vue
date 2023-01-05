<script setup>
import { useContactModuleStore } from '@/modules/contact/store';

const contactStore = useContactModuleStore();
</script>
<template>
  <label>
    Address
    <input type="text" v-model="contactStore.address" />
  </label>
</template>
