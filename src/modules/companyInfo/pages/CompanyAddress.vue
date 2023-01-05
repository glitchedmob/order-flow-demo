<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigation';
import { useCompanyInfoModuleStore } from '@/modules/companyInfo/store';

const navigationStore = useNavigationStore();
const companyInfoStore = useCompanyInfoModuleStore();
</script>
<template>
  <label>
    Company Address
    <input type="text" v-model="companyInfoStore.companyAddress" />
  </label>

  <button @click="navigationStore.nextModule()">Next</button>
</template>
