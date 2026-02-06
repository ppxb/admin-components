import { ref } from 'vue';

export function useSidebar() {
  const collapsed = ref(false);

  function toggleSidebar() {
    collapsed.value = !collapsed.value;
  }

  return {
    collapsed,
    toggleSidebar,
  };
}
