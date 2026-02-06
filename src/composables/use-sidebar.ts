import { readonly, ref } from 'vue';

const collapsed = ref(false);
const hovered = ref(false);

export function useSidebar() {
  const toggleSidebar = () => {
    collapsed.value = !collapsed.value;
    if (collapsed.value) {
      hovered.value = false;
    }
  };

  const setCollapsed = (value: boolean) => {
    collapsed.value = value;
    if (value) {
      hovered.value = false;
    }
  };

  const setHovered = (value: boolean) => {
    if (!collapsed.value) return;
    hovered.value = value;
  };

  return {
    collapsed: readonly(collapsed),
    hovered: readonly(hovered),
    toggleSidebar,
    setCollapsed,
    setHovered,
  };
}
