<script setup lang="ts">
import { ref } from 'vue'

const succes = ref(false)
const error = ref(false)

const apiKey = ref(localStorage.getItem('apiKey') || '')

async function saveKey() {
  try {
    succes.value = false
    error.value = false

    // save it
    localStorage.setItem('apiKey', apiKey.value)

    await fetch("http://localhost/api/populate",
      {
        body: JSON.stringify({
          "apiKey": apiKey.value
        }),
        credentials: 'same-origin',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      }
    )

    succes.value = true
  } catch (err) {
    error.value = true
  }
}
</script>

<template>
  <h1 class="text-xl font-bold mb-3">API</h1>
  <form class="space-y-3 flex flex-col max-w-80" @submit.prevent="saveKey">
    <label for="apikey">API key:</label>
    <input type="text" id="apikey" name="apikey" v-model="apiKey" />
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 mt-3 rounded" type="submit">
      Save
    </button>
    <p v-if="succes" class="text-emerald-600">
      Api key has been saved! Check out the <router-link to="/voting">voting</router-link> page and start catmashing 😻
    </p>
    <p v-if="error" class="text-rose-600">
      Something went wrong, please check your ApiKey
    </p>
  </form>
</template>
