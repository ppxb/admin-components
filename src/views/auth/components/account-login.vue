<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, Field as VeeField } from 'vee-validate';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import * as z from 'zod';
import { fetchImgCaptcha } from '@/apis/captcha';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { $t } from '@/locales';

const formSchema = computed(() =>
  toTypedSchema(
    z.object({
      tenantId: z.string().optional(),
      username: z.string().min(1, $t('auth.account.form.username.validator')),
      password: z.string().min(1, $t('auth.account.form.password.validator')),
      captcha: z.string().length(4, $t('auth.account.form.captcha.validator')),
    }),
  ),
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    tenantId: '',
    username: 'admin',
    password: 'admin123',
    captcha: '',
  },
});

const captchaUUID = ref('');
const captchaImg = ref('');
const captchaExpireTime = ref(0);
const isCaptchaExpired = ref(false);

let timer: ReturnType<typeof setTimeout> | null = null;

const onSubmit = handleSubmit((values) => {
  // eslint-disable-next-line no-console
  console.log('Logging in with ', values);
});

async function getImgCaptcha() {
  const { data, error } = await fetchImgCaptcha();
  if (!error) {
    captchaUUID.value = data.uuid;
    captchaImg.value = data.img;
    captchaExpireTime.value = data.expireTime;
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
  <form id="login-form" class="p-6 md:p-8" @submit="onSubmit">
    <FieldGroup>
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-bold">
          {{ $t('auth.account.title') }}
        </h1>
        <p class="text-muted-foreground text-sm text-balance">
          {{ $t('auth.account.desc') }}
        </p>
      </div>

      <VeeField v-slot="{ field, errors }" name="tenantId">
        <Field :data-invalid="!!errors.length">
          <Input
            v-bind="field"
            :placeholder="$t('auth.account.form.tenant.placeholder')"
            autocomplete="off"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>

      <VeeField v-slot="{ field, errors }" name="username">
        <Field :data-invalid="!!errors.length">
          <Input
            :model-value="field.value"
            :placeholder="$t('auth.account.form.username.placeholder')"
            autocomplete="username"
            :aria-invalid="!!errors.length"
            @update:model-value="field.onChange"
          />
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>

      <VeeField v-slot="{ field, errors }" name="password">
        <Field :data-invalid="!!errors.length">
          <Input
            :model-value="field.value"
            type="password"
            :placeholder="$t('auth.account.form.password.placeholder')"
            autocomplete="current-password"
            :aria-invalid="!!errors.length"
            @update:model-value="field.onChange"
          />
          <FieldError v-if="errors.length" :errors="errors" />
          <FieldDescription class="text-right">
            <div
              class="hover:text-primary text-sm no-underline underline-offset-2 hover:cursor-pointer hover:underline"
            >
              {{ $t('auth.account.forgetPwd') }}
            </div>
          </FieldDescription>
        </Field>
      </VeeField>

      <VeeField v-slot="{ field, errors }" name="captcha">
        <Field :data-invalid="!!errors.length">
          <div class="flex gap-2">
            <Input
              v-bind="field"
              :placeholder="$t('auth.account.form.captcha.placeholder')"
              class="flex-1"
              autocomplete="off"
              :aria-invalid="!!errors.length"
            />

            <div class="relative w-22 shrink-0 md:w-28" @click="getImgCaptcha">
              <img
                v-if="captchaImg"
                :src="captchaImg"
                alt="Captcha"
                class="size-full rounded-lg object-contain hover:cursor-pointer"
              />

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
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>

      <Field>
        <Button type="submit" form="login-form">
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
