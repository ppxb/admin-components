<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { fetchImgCaptcha } from '@/apis/captcha';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { $t } from '@/locales';

interface AccountLoginForm {
  tenantId: string;
  username: string;
  password: string;
  captcha: string;
}

const form = ref<AccountLoginForm>({
  tenantId: '',
  username: 'admin',
  password: 'admin123',
  captcha: '',
});

const captchaUUID = ref('');
const captchaImg = ref('');
const captchaExpireTime = ref(0);
const isCaptchaExpired = ref(false);

let timer: ReturnType<typeof setTimeout> | null = null;

function handleLogin() {
  // eslint-disable-next-line no-console
  console.log('Logging in with', form.value.username, form.value.password);
}

async function getImgCaptcha() {
  const { data, error } = await fetchImgCaptcha();
  if (!error) {
    captchaUUID.value = data.uuid;
    captchaImg.value = data.img;
    captchaExpireTime.value = data.expireTime;
    form.value.captcha = '';
    isCaptchaExpired.value = false;

    startExpireTimer(data.expireTime);
  }
}

function startExpireTimer(expireTime: number) {
  if (timer) {
    clearTimeout(timer);
  }

  const remainingTime = expireTime - Date.now();
  if (remainingTime <= 0) {
    isCaptchaExpired.value = true;
    return;
  }
  timer = setTimeout(() => {
    isCaptchaExpired.value = true;
  }, remainingTime);
}

onMounted(getImgCaptcha);

onBeforeUnmount(() => {
  if (timer) {
    clearTimeout(timer);
  }
});
</script>

<template>
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
        <Input
          v-model="form.tenantId"
          :placeholder="$t('auth.account.form.tenant.placeholder')"
          required
        />
      </Field>

      <Field>
        <Input
          v-model="form.username"
          :placeholder="$t('auth.account.form.username.placeholder')"
          required
        />
      </Field>

      <Field>
        <Input
          v-model="form.password"
          type="password"
          :placeholder="$t('auth.account.form.password.placeholder')"
          required
        />
        <div class="flex items-center">
          <a
            href="#"
            class="ml-auto text-sm underline-offset-2 hover:underline"
          >
            {{ $t('auth.account.forgetPwd') }}
          </a>
        </div>
      </Field>

      <Field>
        <div class="flex gap-2">
          <Input
            id="captcha"
            v-model="form.captcha"
            :placeholder="$t('auth.account.form.captcha.placeholder')"
            class="flex-1"
            required
          />

          <div
            class="relative w-22 shrink-0 rounded-lg md:w-28"
            @click="getImgCaptcha"
          >
            <img
              v-if="captchaImg"
              :src="captchaImg"
              alt="Captcha"
              class="h-full w-full object-contain hover:cursor-pointer"
            >

            <div
              v-if="isCaptchaExpired"
              class="absolute inset-0 flex items-center justify-center rounded-lg bg-black/60 backdrop-blur hover:cursor-pointer"
            >
              <span class="text-xs text-white">
                {{ $t('auth.account.form.captcha.expired') }}
              </span>
            </div>
          </div>
        </div>
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
</template>
