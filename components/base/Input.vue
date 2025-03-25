<script setup lang="ts">
interface Props {
  modelValue: string;
  modelPlaceholder: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
});

const emit = defineEmits(['update:modelValue']);

function updateModelValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>

<template>
  <input
    ref="input"
    class="block w-full max-w-xs mx-auto shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md text-gray-700"
    :value="modelValue"
    @input="updateModelValue"
    :placeholder="modelPlaceholder"
  >
</template>
