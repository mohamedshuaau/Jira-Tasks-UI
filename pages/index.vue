<template>
  <header>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold leading-tight tracking-tight text-primary">Dashboard</h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 px-24 mt-12">

      <div class="table data w-full mb-12" v-if="dashboard">
        <div>
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-base font-extrabold leading-6 text-primary">Tasks</h1>
              <p class="mt-2 text-sm text-secondary">Here is a list of your most recent tasks</p>
            </div>
          </div>
          <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Issue ID
                      </th>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Issue Type
                      </th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Summary</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Due Date</th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="issue in dashboard?.recent_issues" :key="issue.issue_id">
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {{ issue.issue_id }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ issue.issue_type }}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ issue.summary }}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ issue.status }}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ issue.due_date }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <div class="p-4 rounded-md shadow-md bg-white">
          <h6>Issues Overview</h6>
          <client-only>
            <div class="mt-3 -mx-3 -mb-5">
              <ApexCharts
                  v-if="dashboard"
                  :options="overviewChartOptions"
                  :series="[dashboard?.issues_overview?.open, dashboard?.issues_overview?.done]"
              ></ApexCharts>
            </div>
          </client-only>
        </div>

        <div class="p-4 rounded-md shadow-md bg-white">
          <h6>Tasks Pending</h6>
          <client-only>
            <div class="mt-3 -mx-3 -mb-5">
              <ApexCharts
                  v-if="dashboard"
                  :options="chartData"
                  :series="chartDataSeries"
              ></ApexCharts>
            </div>
          </client-only>
        </div>
      </div>

    </div>
  </main>
</template>
<script setup lang="ts">
import {useDashboardStore} from "~/stores/DashboardStore";

definePageMeta({
  layout: 'default'
})
useHead({title: 'Dashboard'})

const dashboardStore = useDashboardStore();
const ApexCharts = defineAsyncComponent(() => import("vue3-apexcharts"));

const overviewChartOptions = {
  labels: ['Pending', 'Done'],
  chart: {
    width: 380,
    type: 'donut',
  },
  dataLabels: {
    enabled: false
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        show: false
      }
    }
  }],
  legend: {
    position: 'right',
    offsetY: 0,
    height: 230,
  }
}

const chartData = ref({
  chart: {
    height: 350,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [] as string[],
  },
  yaxis: {
    title: {
      text: 'Count',
    },
  },
});

const chartDataSeries = ref([{}]);
const dashboard = ref();

function fillData(data: any[]) {
  const categories = data.map((item: any) => `${item.issue_type} : ${item.status}`);
  const series = data.map((item: any) => item._count.id);
  chartData.value.xaxis.categories = categories;
  chartDataSeries.value = [{ data: series }];
}

onMounted(() => {
  const config = useRuntimeConfig();
  useHttp(`${config.public.application_api}/api/v1/jira/dashboard`, {
    method: 'get'
  }).then((response) => {
    dashboard.value = response.data.data;
    fillData(response.data.data.column_chart);
  })
})
</script>