<script setup lang="ts">
import { ArrowLeft, Home } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const router = useRouter();

function goHome() {
  router.push('/');
}

function goBack() {
  router.back();
}
</script>

<template>
  <div
    class="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10"
  >
    <div class="w-full max-w-md">
      <Card class="overflow-hidden">
        <CardContent class="grid gap-6 p-6 md:p-8">
          <div class="flex flex-col items-center gap-2 text-center">
            <div class="text-primary font-mono text-8xl font-bold">
              404
            </div>
            <h1 class="text-2xl font-bold">
              {{ $t('common.pageNotFound') }}
            </h1>
            <p class="text-muted-foreground text-sm">
              {{ $t('common.pageNotFoundDesc') }}
            </p>
          </div>

          <div class="flex gap-4">
            <Button variant="outline" class="flex-1" @click="goBack">
              <ArrowLeft class="mr-2 h-4 w-4" />
              {{ $t('common.goBack') }}
            </Button>
            <Button class="flex-1" @click="goHome">
              <Home class="mr-2 h-4 w-4" />
              {{ $t('common.goHome') }}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
