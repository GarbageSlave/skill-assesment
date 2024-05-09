<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

async function logout() {
  await authStore.logout()
  router.replace('/')
}

logout()
</script>

<template>
  <h1 class="text-xl font-bold mb-3">Logout</h1>
</template>
