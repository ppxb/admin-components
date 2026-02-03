<script setup lang="ts">
import ToggleLanguage from '@/components/toggle-language.vue';
import PasswordLogin from './components/password-login.vue';

const appTitle = import.meta.env.VITE_APP_TITLE;
</script>

<template>
  <div
    className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10"
  >
    <div className="w-full max-w-sm md:max-w-4xl">
      <div class="mb-8 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <img src="/public/logo.svg" alt="logo" class="w-6 md:w-8" />
          <div class="font-bold md:text-lg">
            {{ appTitle }}
          </div>
        </div>
        <ToggleLanguage />
      </div>
      <PasswordLogin />
    </div>
  </div>
</template>
