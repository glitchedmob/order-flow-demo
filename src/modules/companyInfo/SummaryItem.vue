<script setup lang="ts">
import { useCompanyInfoModuleStore } from '@/modules/companyInfo/store';

const companyInfoStore = useCompanyInfoModuleStore();
</script>

<template>
  <h3>Company Summary</h3>

  <label>
    Company Address
    <input type="text" v-model="companyInfoStore.companyAddress" />
  </label>

  <label>
    Company Name
    <input type="text" v-model="companyInfoStore.companyName" />
  </label>
</template>
