import {acceptHMRUpdate, defineStore} from "pinia";

export const useDashboardStore = () => {
    const config = useRuntimeConfig();
    const storeDefinition = defineStore("DashboardStore", {
        state: (): { dashboard: any } => ({
            dashboard: {}
        }),

        getters: {
            //
        },

        actions: {
            getDashboard() {
                useHttp(`${config.public.application_api}/api/v1/jira/dashboard`, {
                    method: 'get'
                }).then((response) => {
                    this.dashboard = response.data.data;
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