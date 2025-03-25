import {defineStore} from 'pinia'
import {toast} from 'vue3-toastify'
import { useSupabaseClient } from '#imports'


export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        token: null
    }),

    actions:{
        async login(email: string, password: string) {
            try {
              const supabase = useSupabaseClient();
              const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
              });

              if (error) {
                throw error;
              }

              if (!data.session) {
                throw new Error("Session is missing");
              }

              this.user = data.session.user;
              this.token = data.session.access_token;
              await supabase.auth.setSession(data.session);

              navigateTo("/");
              toast.success("Logged in successfully");
            } catch (error) {
              console.error(error);

              if (error.status === 400 || error.status === 404 || error.status === 401) {
                toast.error("Invalid email or password");
              } else {
                toast.error("Invalid credentials");
              }
            }
          },
          async register(email: string, password: string) {
            try {
              const supabase = useSupabaseClient();
              const { data, error } = await supabase.auth.signUp({
                email,
                password,
              });

              if (error) {
                throw error;
              }

              if (!data.session) {
                throw new Error("Session is missing");
              }

              this.user = data.session.user;
              this.token = data.session.access_token;
              await supabase.auth.setSession(data.session);

              navigateTo("/");
              toast.success("Registered in successfully");
            } catch (error) {
              console.error(error);

              if (error.status === 400 || error.status === 401 || error.status === 403) {
                toast.error("Invalid email or email arleady used!");
              } else {
                toast.error("Invalid credentials");
              }
            }
          },
        async logout(){
            try {
                const supabase = useSupabaseClient();
                await supabase.auth.signOut();
                this.user = null
                this.token = null
                navigateTo("/login");
                toast.success("Logged out successfully")
            } catch (error) {
                toast.error("Something went wrong")
            }
        }
    }
})
