<script setup>
import {toast} from 'vue3-toastify'
import { useNoteStore } from '~/store/note/noteStore';

const noteStore = useNoteStore();
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  id: {
    type: [String , Number ],
    required: true
  }
})

const handleDelete = async() => {
    try {
        noteStore.deleteNote(props.id)
    } catch (error) {
        toast.error("Something went wrong!")
        console.log(error);
    }
}
</script>

<template>
  <div class="bg-amber-400 mb-4 rounded-md px-4 py-4 flex items-center justify-between group hover:bg-amber-300 duration-150 cursor-pointer">
    <NuxtLink class="w-full cursor-pointer group-hover:ml-2 duration-200 ease-in" :to="`/note/${props.id}`">
        <span class="text-white font-semibold">{{ title }}</span>
    </NuxtLink>
    <div>
        <button @click="handleDelete" title="Delete note">
            <img src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png" alt="delete-btn"
            class="size-6 rounded-full duration-150 ease-in-out
            "
            >
        </button>
    </div>
  </div>
</template>
