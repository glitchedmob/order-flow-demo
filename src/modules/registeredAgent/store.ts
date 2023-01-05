import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useRegisteredAgentStore = defineStore('registeredAgent', () => {
  const getRegisteredAgent = ref<boolean>();

  const isValid = computed(() => getRegisteredAgent.value !== undefined);

  const initialize = () => {
    console.log('initialized registeredAgent module');
  };

  return { getRegisteredAgent, isValid, initialize };
});
