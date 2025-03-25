<script setup lang="ts">
import {ref} from 'vue'
import Button from '../base/Button.vue';
import {useUserStore} from '~/store/user/userStore';
import {toast} from 'vue3-toastify'
const authStore = useUserStore();
const model = ref({
  email: '',
  password: ''
})

const handleSubmit = async () => {
  try {
    if(!model.value.email){
        toast.error('Email is required');
        return;
    }
    if(!model.value.password){
        toast.error('Password is required');
        return;
    }
    if(!model.value.email.endsWith('@gmail.com')){
        toast.error('Please enter a valid Gmail address');
        return;
    }
    if(model.value.password.length > 7 ){
        await authStore.register(model.value.email, model.value.password);
    }else{
        toast.error('Password must be at least 8 characters long');
    }
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
        <h3 class="text-2xl">Sign up for a free account</h3>
        <p class="mt-3">Already registered? <NuxtLink class="primary-text-color font-bold" to="/login">Log in</NuxtLink> your account</p>
      </div>
      <form action="POST" class="pt-10 flex flex-col gap-6">
        <label for="email" class="flex flex-col">
          Email Address
          <input v-model="model.email" type="text" class="input-form" placeholder="you@example.com">
        </label>
        <label for="email" class="flex flex-col">
          Password
          <input v-model="model.password" type="password" class="input-form" placeholder="******************">
        </label>
      </form>
      <Button @click="handleSubmit" :fulled="true" class="mt-5">Sign up &RightArrow;</Button>
    </div>
  </div>
</template>
