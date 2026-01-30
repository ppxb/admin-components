import { createSharedComposable } from '@vueuse/core';
import { computed, ref } from 'vue';
import { getMessages } from './messages';

export const useSimpleLocale = createSharedComposable(() => {
  const currentLocale = ref<I18n.SupportedLanguagesType>('zh-CN');

  const setSimpleLocale = (locale: I18n.SupportedLanguagesType) => {
    currentLocale.value = locale;
  };

  const $t = computed(() => {
    const localeMessages = getMessages(currentLocale.value);
    return (key: string) => {
      return localeMessages[key] || key;
    };
  });

  return {
    $t,
    currentLocale,
    setSimpleLocale,
  };
});
