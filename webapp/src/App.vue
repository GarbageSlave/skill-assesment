<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import Assignment from './components/Assignment.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

const menuItems = computed(() => {
  let items = [{ name: 'Home', path: '/', auth: false }]

  if (authStore.isLoggedIn) {
    items.push({ name: 'Logout', path: '/logout', auth: false })
  } else {
    items.push({ name: 'Login', path: '/login', auth: false })
  }

  items.push(
    { name: 'API', path: '/apikey', auth: true },
    { name: 'Voting', path: '/voting', auth: true },
    { name: 'Leaderboard', path: '/leaderboard', auth: true },
  )

  return items
})
</script>

<template>
  <div class="flex h-screen">
    <aside class="w-64" aria-label="Sidebar">
      <div class="overflow-y-auto py-4 px-5 bg-gray-50 dark:bg-gray-800 h-full">
        <span class="text-lg font-semibold mb-2 block text-gray-900 dark:text-white">Menu</span>
        <ul class="space-y-2">
          <li v-for="(item, index) in menuItems" :key="index">
            <router-link
              :to="item.path"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 no-underline"
              :class="{
                'pointer-events-none': item.auth && !authStore.isLoggedIn
              }"
            >
              {{ item.name }}
              <span
                class="text-grey-500 dark:text-gray-400"
                v-if="item.auth && !authStore.isLoggedIn"
              >
                &nbsp;(Unauthorized)
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>
    <main class="flex-1 px-6 py-6 overflow-y-scroll">
      <RouterView />
    </main>
    <!-- <div class="w-[30rem] bg-gray-50 dark:bg-gray-700 dark:text-white py-4 px-6 overflow-y-auto">
      <Assignment />
    </div> -->
  </div>
</template>
