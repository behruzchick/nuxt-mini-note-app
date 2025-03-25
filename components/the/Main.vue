<script setup>
import CLientNote from './CLientNote.vue';
import { useNoteStore } from '~/store/note/noteStore';
import { useUserStore } from '~/store/user/userStore';

const noteStore = useNoteStore();
const userStore = useUserStore();

const handleLogout = async( ) => {
  try{
    userStore.logout();
  }catch( e ){
  console.error("❌ Error in response request!:", e);
  }
};

onMounted(async() => {
    await noteStore.fetchNotes();
})

</script>

<template>
  <div class="w-full min-h-screen relative">
    <NuxtLink to="/">
        <img src="/note-app-logo.png" alt="logo" class="w-[80px] px-3 py-5">
    </NuxtLink>

    <div>
        <h1 class="text-2xl font-bold text-center py-5">Your Notes</h1>
        <div class="pt-5 h-[500px] overflow-hidden overflow-y-auto scrollbar-hidden">
            <p v-if="noteStore.isLoading">Loading...</p>
            <CLientNote v-for="item in noteStore.notes" v-bind:key="item.id" :title="item.title" :id="item.id"     v-if="noteStore.notes.length > 0"/>
                <p  v-if="noteStore.isNotesEmpty" class="text-gray-400 text-sm italic">No notes found.</p>
        </div>
    </div>
    <button class="text-black absolute bottom-0 py-3 flex items-center justify-center duration-150 ml-5 mb-4" :fulled="true" @click="handleLogout">
      <img src="https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/logout-512.png" alt="logout-icon" class="w-[30px] hover:ml-2 duration-150">
    </button>
  </div>
</template>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar{
    display: none;
}
</style>
