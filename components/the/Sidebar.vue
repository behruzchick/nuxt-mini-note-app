<script setup>
import { useRoute } from 'vue-router';
import TheLogin from '~/components/the/Login.vue';
import TheRegister from '~/components/the/Register.vue';

import Main from '~/components/the/Main.vue';

const route = useRoute();
function getComponent(path) {
  switch (path) {
    case "/login":
      return TheLogin;
    case "/register":
      return TheRegister;
    default:
      return Main;
  }
}
</script>

<template>
  <div class="bg-zinc-950 w-1/3 px-8 min-h-screen flex items-center justify-center">
    <component :is="getComponent(route.path)" />
  </div>
</template>
