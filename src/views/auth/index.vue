<script setup lang="ts">
import { computed } from 'vue';
import { Button } from '@/components/ui/button';
import { i18n, loadLocaleMessages } from '@/locales';
import LoginForm from './components/login-form.vue';

const currentLocale = computed(() => i18n.global.locale.value);

const isZhCN = computed(() => currentLocale.value === 'zh-CN');

async function toggleLanguage() {
  const targetLang = isZhCN.value ? 'en-US' : 'zh-CN';
  await loadLocaleMessages(targetLang);
}
</script>

<template>
  <div
    className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10"
  >
    <div className="w-full max-w-sm md:max-w-4xl">
      <div class="absolute top-4 right-4 rounded-xl border md:top-6 md:right-6">
        <Button
          variant="ghost"
          size="sm"
          type="button"
          class="rounded-xl"
          @click="toggleLanguage"
        >
          {{ isZhCN ? 'English' : '简体中文' }}
        </Button>
      </div>
      <LoginForm />
    </div>
  </div>
</template>
