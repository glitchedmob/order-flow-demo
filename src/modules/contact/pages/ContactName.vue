<script setup>
import { useContactModuleStore } from '@/modules/contact/store';

const contactStore = useContactModuleStore();
</script>
<template>
  <label>
    Name
    <input type="text" v-model="contactStore.name" />
  </label>
</template>
