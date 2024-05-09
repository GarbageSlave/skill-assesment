import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const usePreferenceStore = defineStore('preferenceStore', () => {
  const preference = ref<'cats' | 'dogs'>()

  const changePreference = (value: 'cats' | 'dogs') => {
    preference.value = value
    localStorage.setItem('preference', value)
  }

  const getPreference = () => {
    const value = localStorage.getItem('preference') as 'cats' | 'dogs'
    preference.value = value ?? 'cats'
  }

  const textualPreference = computed(() => {
    return preference.value === 'cats' ? 'cat' : 'dog'
  })

  getPreference()

  return { preference, changePreference, textualPreference }
})
