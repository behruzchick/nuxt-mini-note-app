<script setup>
import {useDebounceFn} from '@vueuse/core'
import { nextTick } from "vue";
import { useNoteStore } from '~/store/note/noteStore';


const noteStore = useNoteStore();
const props = defineProps({
  id:{
    type:String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})
const textareaRef = ref(null);
const noteText = ref(props.text);

const resizeTextarea = () => {
  const textarea = textareaRef.value;
  if (!textarea) return;

  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
};

const saveNote = async () => {
  try {
    noteStore.updateNote(noteText.value , props.id)
  } catch (e) {
    console.error("❌ Error:", e);
  }
};

const debouncedSaveNote = useDebounceFn(() => {
  saveNote();
},  1000);

onMounted(async () => {
    await nextTick();
    resizeTextarea();
});
watch(() => props.text, async(newText) => {
  noteText.value = newText;
  await nextTick();
  resizeTextarea();
});

</script>
<template>
  <div class="w-full px-6 py-8 relative flex items-center justify-center">
    <div class="w-1/2 py-5">
      <div class="max-w-[637px] mx-auto w-full flex-grow flex flex-col">
        <textarea
          ref="textareaRef"
          v-model="noteText"
          name="note"
          id="note"
          class="focus:outline-none resize-none bg-transparent w-full focus:ring-0 border-none h-auto appearance-none scrollable flex-grow overflow-hidden"
          required
          autofocus
          placeholder="Write here..."
          @input="resizeTextarea(); debouncedSaveNote();"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollable::-webkit-scrollbar{
  display: none !important;
}
</style>
