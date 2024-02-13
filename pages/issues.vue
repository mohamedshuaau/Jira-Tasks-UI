<template>
  <header>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex  justify-between w-full">
      <h1 class="text-2xl font-bold leading-tight tracking-tight text-primary">Projects</h1>
      <button @click="() => issueStore.syncIssues()" type="button" class="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sync Issues</button>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 px-24 mt-12">

      <div class="tasks flex flex-row gap-4 rounded-lg flex-wrap" v-if="issueStore.issues.length">

        <div
            class="task border bg-white p-4 font-bold rounded-lg shadow-sm cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
            v-for="issue in issueStore.issues">

          <div class="w-full flex justify-between">
            <span class="text-primary text-xs">{{ issue.issue_id }}</span>
          </div>

          <div class="flex flex-col gap-2 items-start">
            <span class="text-primary text-md">{{ issue.summary }}</span>

            <div class="flex flex-col gap-1 items-start">
              <span class="text-[10px] text-white px-2 py-1 rounded-full bg-blue-500">{{ issue.issue_type }}</span>
              <span class="text-[10px] text-white px-2 py-1 rounded-full bg-yellow-400">Due at: {{ issue.due_date }}</span>
              <span class="text-[10px] text-white px-2 py-1 rounded-full bg-blue-500">{{ issue.status }}</span>
              <span class="text-[10px] text-white px-2 py-1 rounded-full bg-green-400">Created at: {{ issue.created_at }}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </main>
</template>
<script setup lang="ts">
import {useIssueStore} from "~/stores/IssueStore";

definePageMeta({
  layout: 'default'
})
useHead({title: 'Issues'})

const issueStore = useIssueStore();

onMounted(() => {
  issueStore.getAllIssues();
})
</script>