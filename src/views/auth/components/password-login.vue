<script setup lang="ts">
import { ref } from 'vue';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Ripple } from '@/components/ui/ripple';
import { $t } from '@/locales';

const tenantId = ref('');
const username = ref('admin');
const password = ref('admin123');

function handleLogin() {
  // eslint-disable-next-line no-console
  console.log('Logging in with', username.value, password.value);
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <Card class="overflow-hidden p-0">
      <CardContent class="grid p-0 md:grid-cols-2">
        <form class="p-6 md:p-8" @submit.prevent="handleLogin">
          <FieldGroup>
            <div class="flex flex-col gap-2">
              <h1 class="text-2xl font-bold">
                {{ $t('auth.account.title') }}
              </h1>
              <p class="text-muted-foreground text-sm text-balance">
                {{ $t('auth.account.desc') }}
              </p>
            </div>

            <Field>
              <FieldLabel for="tenantId">
                {{ $t('auth.account.form.tenant.label') }}
              </FieldLabel>
              <Input
                id="tenantId"
                v-model="tenantId"
                :placeholder="$t('auth.account.form.tenant.placeholder')"
                required
              />
            </Field>

            <Field>
              <FieldLabel for="username">
                {{ $t('auth.account.form.username.label') }}
              </FieldLabel>
              <Input
                id="username"
                v-model="username"
                :placeholder="$t('auth.account.form.username.placeholder')"
                required
              />
            </Field>

            <Field>
              <div class="flex items-center">
                <FieldLabel for="password">
                  {{ $t('auth.account.form.password.label') }}
                </FieldLabel>
                <a
                  href="#"
                  class="ml-auto text-sm underline-offset-2 hover:underline"
                >
                  {{ $t('auth.account.forgetPwd') }}
                </a>
              </div>
              <Input
                id="password"
                v-model="password"
                type="password"
                :placeholder="$t('auth.account.form.password.placeholder')"
                required
              />
            </Field>

            <Field>
              <Button type="submit" @click="handleLogin">
                {{ $t('auth.account.submit') }}
              </Button>
            </Field>

            <FieldDescription class="text-center">
              {{ $t('auth.account.noAccount') }}
              <a href="#"> {{ $t('auth.account.signUp') }}</a>
            </FieldDescription>
          </FieldGroup>
        </form>

        <div className="bg-background relative hidden md:block">
          <Ripple />
        </div>
      </CardContent>
    </Card>

    <FieldDescription class="px-6 text-center">
      By clicking continue, you agree to our
      <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
    </FieldDescription>
  </div>
</template>
