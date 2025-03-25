<script setup>
 definePageMeta({
  middleware:"auth"
})
import CreateNoteVue from "../../components/the/CreateNote.vue";
import {useRoute} from 'vue-router'
import { useNoteStore } from '~/store/note/noteStore';


const noteStore = useNoteStore();
const route = useRoute();
const note = ref({});


const noteId = route.params.id;

async function fetchNote() {
  try {
    noteStore.fetchSingleNote(noteId);
  } catch (error) {
    console.error('Error fetching note:', error);
  }
}
const noteText = computed(() => note.value?.text ?? '');

onMounted(fetchNote);

</script>
<template>
  <div class="w-full">
    <div class="w-full px-4 pt-8">
        <button class="text-4xl" title="back" @click="$router.back()">
            &leftarrow;
        </button>
        <h1 class="text-3xl font-bold mt-3">{{ noteStore.currentNote?.title }}</h1>
        <b class="text-gray-400">{{ new Date(noteStore.currentNote?.created_at).toLocaleDateString() }}</b>
        <CreateNoteVue :id="noteId" :text="noteStore.currentNote?.text"/>
    </div>
  </div>
</template>
