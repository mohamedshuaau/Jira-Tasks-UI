import {acceptHMRUpdate, defineStore} from "pinia";
import {toast} from "vue3-toastify";

export const useProfileStore = () => {
    const config = useRuntimeConfig();
    const storeDefinition = defineStore("ProfileStore", {
        state: (): { formData: { jira_email: string | null, jira_pat: string | null } } => ({
            formData: {
                jira_email: null,
                jira_pat: null,
            }
        }),

        getters: {
            //
        },

        actions: {
            updateProfile() {
                useHttp(`${config.public.application_api}/api/v1/auth/update-profile`, {
                    method: 'patch',
                    body: this.formData
                }).then((response) => {
                    this.formData = {
                        jira_email: response.data.data.jira_email,
                        jira_pat: response.data.data.jira_pat,
                    }
                })
            },
            getCurrentUser() {
                useHttp(`${config.public.application_api}/api/v1/auth/current-user`, {
                    method: 'get'
                }).then((response) => {
                    this.formData = {
                        jira_email: response.data.data.jira_email,
                        jira_pat: response.data.data.jira_pat,
                    }
                })
            },
        },
    });

    const s = storeDefinition();
    if (import.meta.hot) {
        import.meta.hot.accept(acceptHMRUpdate(storeDefinition, import.meta.hot))
    }
    return s;
}