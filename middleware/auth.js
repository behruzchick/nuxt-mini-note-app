import { useSupabaseClient } from "#imports";
import { useUserStore } from '~/store/user/userStore'
export default defineNuxtRouteMiddleware(async () => {
  console.log("Middleware запущен");
  const authStore = useUserStore();
  const supabase = useSupabaseClient();
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    console.log("Пользователь не авторизован. Редирект на /login");
    return navigateTo("/login", { replaceState: true });
  }
  authStore.user = data.session.user;
  console.log("Пользователь авторизован. Доступ разрешён.");
});
