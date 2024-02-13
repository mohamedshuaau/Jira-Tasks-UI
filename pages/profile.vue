<template>
  <header>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex  justify-between w-full">
      <h1 class="text-2xl font-bold leading-tight tracking-tight text-primary">Profile</h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 px-24 mt-12">

      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm leading-6 text-gray-900">Jira Email</label>
          <div class="mt-2">
            <input v-model="profileStore.formData.jira_email" id="email" name="email" type="text" autocomplete="username" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm leading-6 text-gray-900">Jira PAT</label>
          <div class="mt-2">
            <input v-model="profileStore.formData.jira_pat" id="pat" name="pat" type="text" autocomplete="username" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button @click.prevent="() => profileStore.updateProfile()" type="button" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update Profile</button>
        </div>
      </form>

    </div>
  </main>
</template>
<script setup lang="ts">
import {useProfileStore} from "~/stores/ProfileStore";

definePageMeta({
  layout: 'default'
})
useHead({title: 'Profile'})

const profileStore = useProfileStore();

onMounted(() => {
  profileStore.getCurrentUser();
})
</script>