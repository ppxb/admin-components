<script setup lang="ts">
import { computed } from 'vue';
import { LucideLanguage } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { i18n, loadLocaleMessages } from '@/locales';

const languages = [
  { value: 'zh-CN' as const, label: '简体中文' },
  { value: 'en-US' as const, label: 'English' },
];

const currentLocale = computed(() => i18n.global.locale.value);

async function changeLanguage(lang: I18n.SupportedLanguagesType) {
  await loadLocaleMessages(lang);
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="rounded-xl border bg-white">
        <LucideLanguage class="h-4 w-4" />
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
