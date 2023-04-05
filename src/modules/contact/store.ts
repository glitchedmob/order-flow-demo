import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useContactStore = defineStore('contact', () => {
  const name = ref('');
  const address = ref('');

  const isValid = computed(() => name.value !== '' && address.value !== '');

  const initialize = () => {
    console.log('Initialized contact module');
  };

  return { name, address, isValid, initialize };
});
