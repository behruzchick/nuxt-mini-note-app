<script setup>
import { toast } from "vue3-toastify";
import { useUserStore } from '~/store/user/userStore';
import { useNoteStore } from '~/store/note/noteStore';


const noteStore = useNoteStore();
const userStore = useUserStore();

const props = defineProps({
  isOpen:{
    type: Boolean,
    required: true,
  }
})





const noteTitle = ref("");
const emit = defineEmits(["update:isOpen"]);

const closeModal = () => {
  emit("update:isOpen", false);
};

const createNote = async () => {
  try {
    if (!noteTitle.value) {
      toast.error("Note title is required");
      return;
    }
    await noteStore.addNote(noteTitle.value , userStore?.user?.id);
    closeModal();
    noteTitle.value = "";
  } catch (e) {
    console.error("❌ Error:", e);
  }
};


</script>
<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
            <div class="flex justify-between items-center">
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Create note
              </DialogTitle>
              <button class="hover:bg-gray-100 rounded-full px-2 py-2" @click="closeModal">
                <img src="/close-icon.webp" alt="close-btn" class="w-7">
              </button>
            </div>
              <div class="mt-2 flex flex-col gap-4 py-5">
                  <input @keyup.enter="createNote"  placeholder="Enter title" v-model="noteTitle" class="text-black rounded-md"/>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="createNote"
                >
                  Create
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
