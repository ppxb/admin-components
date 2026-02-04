<script setup lang="ts">
import { ref } from 'vue';
import ToggleLanguage from '@/components/toggle-language.vue';
import { Card, CardContent } from '@/components/ui/card';
import { FieldDescription } from '@/components/ui/field';
import { Ripple } from '@/components/ui/ripple';
import AccountLogin from './components/account-login.vue';

const appTitle = import.meta.env.VITE_APP_TITLE;

const loginType = ref<'account' | 'phone' | 'email'>('account');
</script>

<template>
  <div
    className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10"
  >
    <div className="w-full max-w-sm md:max-w-4xl">
      <div class="mb-8 flex items-center justify-between md:justify-end">
        <div class="flex items-center gap-2 md:hidden">
          <img src="/logo.svg?url" alt="logo" class="w-6 md:w-8">
          <div class="font-bold md:text-lg">
            {{ appTitle }}
          </div>
        </div>
        <ToggleLanguage />
      </div>

      <div class="flex flex-col gap-6">
        <Card class="overflow-hidden p-0">
          <CardContent class="grid p-0 md:grid-cols-2">
            <AccountLogin v-if="loginType === 'account'" />
            <div class="bg-background relative hidden justify-end md:flex">
              <div class="flex h-fit items-center gap-2 p-8">
                <img src="/logo.svg?url" alt="logo" class="w-6 md:w-8">
                <div class="font-bold md:text-lg">
                  {{ appTitle }}
                </div>
              </div>
              <Ripple />
            </div>
          </CardContent>
        </Card>
        <FieldDescription class="px-6 text-center">
          © 2026 Continew Org. All rights reserved.
        </FieldDescription>
      </div>
    </div>
  </div>
</template>
