import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(document.cookie.includes('token'))

  async function login(username: string, password: string) {
    const response = await fetch("http://localhost/api/login",
      {
        body: JSON.stringify({
          username,
          password
        }),
        credentials: 'same-origin',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      }
    )

    if (response.ok) {
      isLoggedIn.value = true
    }
  }

  async function logout() {
    await fetch("http://localhost/api/logout",
      {
        credentials: 'same-origin',
      }
    )
    isLoggedIn.value = false
  }

  return { isLoggedIn, login, logout }
})
