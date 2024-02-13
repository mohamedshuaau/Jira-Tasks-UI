import {acceptHMRUpdate, defineStore} from "pinia";
import {toast} from "vue3-toastify";

export const useIssueStore = () => {
    const config = useRuntimeConfig();
    const storeDefinition = defineStore("IssueStore", {
        state: (): { issues: any } => ({
            issues: []
        }),

        getters: {
            //
        },

        actions: {
            getAllIssues() {
                useHttp(`${config.public.application_api}/api/v1/jira/issues`, {
                    method: 'get'
                }).then((response) => {
                    this.issues = response.data;
                })
            },
            syncIssues() {
                useHttp(`${config.public.application_api}/api/v1/jira/issues/sync`, {
                    method: 'get'
                }).then((response) => {
                    this.getAllIssues();
                    toast.success('Your issues has been successfully updated');
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