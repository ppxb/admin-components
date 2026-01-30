<script setup lang="ts">
import { cn } from '@/lib/utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  mainCircleSize: {
    type: Number,
    default: 210,
  },
  mainCircleOpacity: {
    type: Number,
    default: 0.24,
  },
  numCircles: {
    type: Number,
    default: 8,
  },
  className: {
    type: String,
    default: '',
  },
});

function getRippleStyle(i: number) {
  const size = props.mainCircleSize + i * 70;
  const opacity = props.mainCircleOpacity - i * 0.03;
  const animationDelay = `${i * 0.06}s`;

  return {
    '--i': i,
    width: `${size}px`,
    height: `${size}px`,
    opacity,
    animationDelay,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'var(--foreground)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(1)',
  };
}
</script>

<template>
  <div
    :class="
      cn(
        'pointer-events-none absolute inset-0 mask-[linear-gradient(to_bottom,white,transparent)] select-none',
        className,
      )
    "
    v-bind="$attrs"
  >
    <div
      v-for="i in numCircles"
      :key="i - 1"
      class="animate-ripple bg-foreground/25 absolute rounded-full border shadow-xl"
      :style="getRippleStyle(i - 1)"
    />
  </div>
</template>
