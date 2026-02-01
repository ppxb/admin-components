<script setup lang="ts">
import ToggleLanguage from '@/components/toggle-language.vue';
import LoginForm from './components/login-form.vue';
</script>

<template>
  <div
    className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10"
  >
    <div className="w-full max-w-sm md:max-w-4xl">
      <div class="absolute top-6 right-6 md:top-6 md:right-6">
        <ToggleLanguage />
      </div>
      <LoginForm />
    </div>
  </div>
</template>
