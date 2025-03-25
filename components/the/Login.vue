<script setup lang="ts">
import {ref} from 'vue'
import Button from '../base/Button.vue';
import {useUserStore} from '~/store/user/userStore';

const authStore = useUserStore();

const model = ref({ email: "", password: "" });
const handleSubmit = async () => {
  try {
    await authStore.login(model.value.email, model.value.password);
  } catch (error) {
    console.error("❌ Error in response request!:", error);
  }
};
</script>
<template>
  <div class="w-full">
    <div>

      <div>
        <img src="/note-app-logo.png" alt="" class="w-10 mb-4">
      </div>

      <div>
        <h3 class="text-2xl">Log in to your account</h3>
        <p class="mt-3">Don't have an account? <NuxtLink class="primary-text-color font-bold" to="/register">Sign up</NuxtLink> for one</p>
      </div>
      <form action="" class="pt-10 flex flex-col gap-6">
        <label for="email" class="flex flex-col">
          Email Address
          <input type="text" v-model="model.email" class="input-form" placeholder="you@example.com">
        </label>
        <label for="email" class="flex flex-col">
          Password
          <input type="password" v-model="model.password" class="input-form" placeholder="******************">
        </label>
      </form>
      <Button @click="handleSubmit" :fulled="true" class="mt-5">Log in &RightArrow;</Button>
    </div>
  </div>
</template>
