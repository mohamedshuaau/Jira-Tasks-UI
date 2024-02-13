import {acceptHMRUpdate, defineStore} from "pinia";
import {getData, setData} from 'nuxt-storage/local-storage';
import {toast} from "vue3-toastify";

export const useAuthStore = () => {
    const config = useRuntimeConfig();
    const storeDefinition = defineStore("AuthStore", {
        state: (): { token: string | null, user: string | null, formData: { username: string | null, password: string | null } } => ({
            token: null,
            user: null,
            formData: {
                username: null,
                password: null
            }
        }),

        getters: {
            isLoggedIn: (state) => !!state.token,
        },

        actions: {
            getToken() {
                const token = getData('access_token');
                const user = getData('user');
                if (!token) {
                    this.token = null;
                    return;
                }
                if (!user) {
                    this.token = null;
                    return;
                }
                this.token = token;
            },
            logout() {
                setData('access_token', null);
                setData('user', null);
                this.token = null;
                this.user = null;

                return navigateTo('/login', {replace: true});
            },
            async login() {
                if (!this.formData.username || !this.formData.password) {
                    toast.warn("Username or Password is missing");
                }
                useHttp(`${config.public.application_api}/api/v1/auth/login`, {
                    method: 'post',
                    body: this.formData
                }).then((response) => {
                    setData('access_token', response.data.data.access_token);
                    setData('user', response.data.data);
                    navigateTo('/', {replace: true});
                })
            }
        },
    });

    const s = storeDefinition();
    if (import.meta.hot) {
        import.meta.hot.accept(acceptHMRUpdate(storeDefinition, import.meta.hot))
    }
    return s;
}