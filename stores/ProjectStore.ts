import {acceptHMRUpdate, defineStore} from "pinia";
import {toast} from "vue3-toastify";

export const useProjectStore = () => {
    const config = useRuntimeConfig();
    const storeDefinition = defineStore("ProjectStore", {
        state: (): { projects: any } => ({
            projects: []
        }),

        getters: {
            //
        },

        actions: {
            getAllProjects() {
                useHttp(`${config.public.application_api}/api/v1/jira/projects`, {
                    method: 'get'
                }).then((response) => {
                    this.projects = response.data;
                })
            },
            syncProjects() {
                useHttp(`${config.public.application_api}/api/v1/jira/projects/sync`, {
                    method: 'get'
                }).then((response) => {
                    this.getAllProjects();
                    toast.success('Your projects has been successfully updated');
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