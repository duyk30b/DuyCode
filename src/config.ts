import { reactive } from 'vue'

export const CONFIG = reactive({
  CLIENT_ID: '',
  MODE: import.meta.env.MODE as 'development' | 'production',
  BUILD_TIME: '',
})

export const LocalStorageKeys = {
  token: 'docs.github.token',
  THEME: 'THEME',
  draftPrefix: 'blog.draft.',
}

const loadConfig = async () => {
  try {
    let CLIENT_ID = localStorage.getItem('CLIENT_ID')
    if (!CLIENT_ID) {
      CLIENT_ID = Math.random().toString(36).substring(2).toUpperCase()
      localStorage.setItem('CLIENT_ID', CLIENT_ID)
    }
    CONFIG.CLIENT_ID = CLIENT_ID

    const res = await fetch('/config.json')
    if (!res.ok) return
    const config: { buildTime: string } = await res.json()
    CONFIG.BUILD_TIME = config.buildTime
  } catch (error) {
    console.log('🚀 ~ config.ts:28 ~ loadConfig ~ error:', error)
  }
}

loadConfig()
