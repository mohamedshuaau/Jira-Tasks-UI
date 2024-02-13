<template>
  <header>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex  justify-between w-full">
      <h1 class="text-2xl font-bold leading-tight tracking-tight text-primary">Projects</h1>
      <button @click="() => projectStore.syncProjects()" type="button" class="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sync Projects</button>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 px-24 mt-12">

      <div class="projects flex flex-row gap-4 rounded-lg">

        <div @click.prevent="navigateTo('/issues')" class="project relative rounded-lg shadow-sm cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out" v-for="project in projectStore.projects">
          <img :src="project.avatar" alt="project image">

          <span class="absolute bottom-0 p-2 text-white bg-slate-500/50 w-full">{{project.name}}</span>
        </div>

      </div>

    </div>
  </main>
</template>
<script setup lang="ts">
import {useProjectStore} from "~/stores/ProjectStore";

definePageMeta({
  layout: 'default'
})
useHead({title: 'Projects'})

const projectStore = useProjectStore();

onMounted(() => {
  projectStore.getAllProjects();
})
</script>