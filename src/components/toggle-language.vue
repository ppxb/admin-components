<script setup lang="ts">
import type { SupportedLanguagesType } from '@/types/i18n';
import { computed } from 'vue';
import { LucideLanguage } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { i18n, loadLocaleMessages } from '@/locales';

withDefaults(
  defineProps<{
    isLogin?: boolean;
  }>(),
  {
    isLogin: false,
  },
);
const languages = [
  { value: 'zh-CN' as const, label: '简体中文' },
  { value: 'en-US' as const, label: 'English' },
];

const currentLocale = computed(() => i18n.global.locale.value);

async function changeLanguage(lang: SupportedLanguagesType) {
  await loadLocaleMessages(lang);
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        size="icon-sm"
        :class="cn('rounded-lg', isLogin && 'bg-background border')"
      >
        <LucideLanguage />
        <span class="sr-only">Switch language</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        v-for="lang in languages"
        :key="lang.value"
        :class="{ 'bg-accent': currentLocale === lang.value }"
        @click="changeLanguage(lang.value)"
      >
        {{ lang.label }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
