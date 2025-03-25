<script setup>
import ModalVue from '../components/base/Modal.vue'
 definePageMeta({
  middleware:"auth"
})
const isOpen = ref(false);

const openModal = ( ) => {
  isOpen.value = true;
}

</script>

<template>
  <div class="w-full px-6 py-6 flex items-center justify-center min-h-screen relative">
    <button @click="openModal" class="flex items-center gap-2 cursor-pointer absolute top-8 left-8">
      <img class="" src="/create-note.png" alt="create-note-icon">
      <span class="text-gray-500">Create note</span>
    </button>
    <div class="flex items-center justify-center">
        <ul>
            <NuxtLink to="https://t.me/behruz_akbaraliev" target="_blank" class="flex items-center gap-4 bg-cyan-500 rounded-md px-4 py-2 duration-300 ease-in-out hover:bg-cyan-600 active:bg-cyan-800 justify-between">
                <b>Contact with me</b>
                <img src="/tg-logo.webp" alt="telegram-logo" class="size-9">
            </NuxtLink>
            <NuxtLink to="https://github.com/behruzchick" target="_blank" class="flex items-center gap-4 bg-gray-700  mt-3 rounded-md px-4 py-2 duration-300 ease-in-out hover:bg-gray-600 active:bg-gray-800 justify-between">
                <b>See more projects</b>
                <img src="/github-logo.png" alt="telegram-logo" class="size-9">
            </NuxtLink>
        </ul>
    </div>
    <ModalVue v-model:isOpen="isOpen" />
  </div>

</template>
