<script setup lang="ts">
import { usePreferenceStore } from '@/stores/preferences'
import { computed } from 'vue'

const preferenceStore = usePreferenceStore()

const preference = computed(() => preferenceStore.preference)
const textualPreference = computed(() => preferenceStore.textualPreference)
</script>

<template>
  <h1>
    Welcome to <span class="capitalize">{{ textualPreference }}</span> FaceMash (<span
      class="capitalize"
    >
      {{ textualPreference }} </span
    >Mash?)
  </h1>
  <p>
    Are you ready to help us find the most adorable {{ textualPreference }}? Inspired by the classic
    FaceMash concept featured in "The Social Network", this (slightly less controversial)
    <span class="capitalize">{{ textualPreference }}</span> FaceMash/HotOrNot application lets you
    be the judge in an epic showdown of <span v-if="preference === 'cats'">feline</span
    ><span v-else>canine</span> cuteness!
  </p>

  <button
    v-if="preference === 'cats'"
    class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
    @click="preferenceStore.changePreference('dogs')"
  >
    Cats? I prefer dogs.
  </button>

  <button
    v-else
    class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
    @click="preferenceStore.changePreference('cats')"
  >
    No, cats are the best!
  </button>

  <p class="mt-3">
    Now that you've chosen a side, it's time to start building the application. On the right, you
    will find your assignment on every page you navigate to, for easy reference.
  </p>
  <p class="text-lg font-medium">Good luck and have fun!</p>
</template>

<style scoped>
h1 {
  @apply text-2xl font-semibold mb-3;
}

h2 {
  @apply text-lg font-semibold mt-6 mb-3;
}
</style>
