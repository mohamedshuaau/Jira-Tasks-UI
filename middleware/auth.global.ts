import {useAuthStore} from "~/stores/AuthStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    authStore.getToken();

    if (['login'].includes(to.name as string)) {
        return;
    }

    if (!authStore.token && process.client) {
        return navigateTo(
            '/login',
            {
                replace: true
            }
        );
    }
});