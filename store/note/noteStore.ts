import {defineStore} from 'pinia'
import {toast} from 'vue3-toastify'
import { useSupabaseClient } from '#imports'
import { useUserStore } from "../user/userStore";


export const useNoteStore = defineStore('note' , {
    state: () => ({
        notes: [],
        currentNote: {},
        isLoading: false,
        error: null,
        isNotesEmpty: false
    }),
    actions: {
        async fetchNotes(){
            try {
                const userStore = useUserStore();
                const supabase = useSupabaseClient();
                this.isLoading = true;
                const { data } = await supabase.from('note').select('*').eq("user_id" , userStore.user?.id);
                this.notes = data;

                if(this.notes.length === 0) {
                    this.isNotesEmpty = true;
                } else {
                    this.isNotesEmpty = false;
                }

                console.log(data);

            } catch (error) {
                this.error = error.message;
                console.log(error);

            } finally {
                this.isLoading = false;
            }
        },
        async fetchSingleNote(id:number){
            try {
                const supabase = useSupabaseClient();
                this.isLoading = true;
                const { data } = await supabase.from('note').select('*').eq("id" , id);
                this.currentNote = data?.[0];


            } catch (error) {
                this.error = error.message;
            } finally {
                this.isLoading = false;
            }
        },
        async addNote(title:string , userId:string){
            try {
                console.log("title: " + title , "userId: " + userId);

                const supabase = useSupabaseClient();
                const {error} = await supabase.from('note').insert({
                    title:title,
                    user_id:userId
                  })

                  if(error) {
                    toast.error('Failed to add note');
                    return;
                  }
                  toast.success('Note created successfully')
            } catch (error) {
                console.log(error);
            }finally{
                this.fetchNotes();
            }
        },
        async updateNote(text:string , id: number){
            try {

                const supabase = useSupabaseClient();
                const {error} = await supabase.from('note').update({
                    text:text,
                  }).eq("id" , id)

                  if(error) {
                    toast.error('Failed in updating note');
                    return;
                  }
                  toast.success('Note updated successfully')
            } catch (error) {
                console.log(error);
            }finally{
                this.fetchNotes();
            }
        },
        async deleteNote(id:number){
            try {
                const supabase = useSupabaseClient();
                await supabase.from('note').delete().eq('id', id);
                toast.success("Note deleted successfully")
            }catch{
                toast.error('Failed to delete note');
            }finally{
                this.fetchNotes();
            }
        }
    }
})
