<script setup lang="ts">
import { useCompanyInfoModuleStore } from '@/modules/companyInfo/store';

const companyInfoStore = useCompanyInfoModuleStore();
</script>
<template>
  <label>
    Company Address
    <input type="text" v-model="companyInfoStore.companyAddress" />
  </label>
</template>
