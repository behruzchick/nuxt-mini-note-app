<script setup>
import TheSidebar from "~/components/the/Sidebar.vue";

</script>

<template>
  <main class="w-full flex">
    <TheSidebar />
    <slot />
  </main>
</template>
