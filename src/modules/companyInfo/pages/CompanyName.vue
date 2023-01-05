<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigation';
import { useCompanyInfoModuleStore } from '@/modules/companyInfo/store';

const companyInfoStore = useCompanyInfoModuleStore();
const navigationStore = useNavigationStore();
</script>
<template>
  <label>
    Company Name
    <input type="text" v-model="companyInfoStore.companyName" />
  </label>

  <button @click="navigationStore.pushModulePage('CompanyAddress')">
    Next
  </button>
</template>
