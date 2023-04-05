import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCompanyInfoModuleStore = defineStore('companyName', () => {
  const companyName = ref('');
  const companyAddress = ref('');

  const isValid = computed(
    () => companyName.value !== '' && companyAddress.value !== '',
  );

  const initialize = () => {
    console.log('Initialized companyInfo module');
  };

  return { companyName, companyAddress, isValid, initialize };
});
