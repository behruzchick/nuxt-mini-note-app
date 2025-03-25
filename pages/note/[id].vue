<script setup>
    import { useRoute } from "vue-router";
    const route = useRoute();
    import { useNoteStore } from '~/store/note/noteStore';

    definePageMeta({
        middleware:"auth"
    })
    const noteStore = useNoteStore();

    const id = route?.params?.id;

    onMounted(() => {
      noteStore.fetchSingleNote(id);
    })
</script>
<template>
    <div class="w-full flex justify-center px-8 py-8">
        <b v-if="noteStore.isLoading">Loading...</b>
        <div class="w-full flex flex-col items-center" v-if="!noteStore.isLoading">
            <div class="w-full flex items-center justify-between">
                <div class="">
                    <h1 class="text-gray-400">{{ noteStore.currentNote?.title }}</h1>
                    <div>
                        <span class="text-gray-500 mt-2">
                            Created:
                            {{ new Date(noteStore.currentNote?.created_at).toLocaleDateString() }}
                        </span>
                    </div>
                </div>
                <div class="">
                    <NuxtLink :to="`/update/${id}`" title="Update note">
                        <img src="/create-note.png" alt="edit-btn">
                    </NuxtLink>
                </div>
            </div>
            <p class="pt-5">{{ noteStore.currentNote?.text }}</p>
        </div>
    </div>
</template>
