import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useContactModuleStore = defineStore('contact', () => {
  const name = ref('');
  const address = ref('');

  const isValid = computed(() => name.value !== '' && address.value !== '');

  const initialize = () => {
    console.log('initialized contact module');
  };

  return { name, address, isValid, initialize };
});
