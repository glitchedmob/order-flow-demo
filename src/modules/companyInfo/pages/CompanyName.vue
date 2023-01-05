<script setup lang="ts">
import { useCompanyInfoModuleStore } from '@/modules/companyInfo/store';

const companyInfoStore = useCompanyInfoModuleStore();
</script>
<template>
  <label>
    Company Name
    <input type="text" v-model="companyInfoStore.companyName" />
  </label>
</template>
