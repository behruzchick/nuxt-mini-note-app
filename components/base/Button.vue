<script setup>
defineProps({
  fulled:{
    type:Boolean,
    default: false,
    required: true,
  }
})
</script>
<template>
  <button
    :class="[
      'px-4 py-2',
      'border border-transparent',
      'text-lg font-medium rounded-md shadow-sm text-black',
      'primary-bg-color hover:bg-amber-500',
      'active:bg-amber-300',
      'duration-150 ease-in-out',
      fulled? 'w-full' : 'w-auto',
    ]"
  >
    <slot />
  </button>
</template>
