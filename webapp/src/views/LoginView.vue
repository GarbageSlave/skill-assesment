<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const error = ref(false)

const username = ref('')
const password = ref('')

async function login() {
  error.value = false

  await authStore.login(username.value, password.value)
  
  if (authStore.isLoggedIn) {
    router.replace('/')
  } else {
    error.value = true
  }
}
</script>

<template>
  <h1 class="text-xl font-bold mb-3">Login</h1>
  <form class="space-y-3 flex flex-col max-w-80" @submit.prevent="login">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" v-model="username" />
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" v-model="password" />
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 mt-3 rounded"
      type="submit"
    >
      Login
    </button>
    <p
      v-show="error"
      class="text-rose-600"
    >
      Username or password is incorrect
    </p>
  </form>
</template>

