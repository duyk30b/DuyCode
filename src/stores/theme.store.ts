import { defineStore } from 'pinia'
import { LocalStorageKeys } from '../config'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: '' as 'DARK' | 'LIGHT',
  }),
  actions: {
    initializeTheme() {
      this.theme = localStorage.getItem(LocalStorageKeys.THEME) === 'DARK' ? 'DARK' : 'LIGHT'
      document.documentElement.setAttribute('data-theme', this.theme)
    },
    toggleTheme() {
      this.theme = this.theme === 'DARK' ? 'LIGHT' : 'DARK'
      document.documentElement.setAttribute('data-theme', this.theme)
      localStorage.setItem(LocalStorageKeys.THEME, this.theme)
    },
  },
})
