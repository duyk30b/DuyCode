<script setup lang="ts">
import { useCategoryStore } from '@/stores/category.store'
import { onBeforeMount, ref } from 'vue'
import { AlertStore } from '../common/vue-alert'
import { VueSwitch } from '../common/vue-form'
import { CONFIG, LocalStorageKeys } from '../config'
import { useAuthStore } from '../stores/auth.store'
import AppHeader from './app_layout/AppHeader.vue'
import AppSidebar from './app_layout/AppSidebar.vue'

const authStore = useAuthStore()

const categoryStore = useCategoryStore()

const loading = ref(false)

const autoLogin = async () => {
  const token = localStorage.getItem(LocalStorageKeys.token)
  if (token) {
    try {
      await authStore.loginByToken(token)
    } catch (error: any) {
      AlertStore.addError(error.message)
      authStore.logout()
    }
  }
}

onBeforeMount(async () => {
  try {
    loading.value = true
    await categoryStore.loadCategoryMenuTree()
    await autoLogin()
  } catch (error: any) {
    console.log('🚀 ~ MainLayout.vue:24 ~ error:', error)
    AlertStore.addError(error.message)
  } finally {
    loading.value = false
  }
})

const handleChangeMode = (value: number | boolean) => {
  if (value) {
    CONFIG.MODE = 'development'
  } else {
    CONFIG.MODE = 'production'
  }
}
</script>

<template>
  <main v-if="!loading">
    <AppSidebar />
    <div class="app_wrapper">
      <AppHeader />
      <div class="app_content">
        <RouterView />
      </div>
      <footer class="px-2">
        <div class="footer_left">
          <strong>DuyCode</strong>
          <span>@{{ CONFIG.BUILD_TIME }}</span>
          <span>Hotline: </span>
          <strong> <a href="tel:0986021190"> 0986.021.190 </a></strong>
        </div>
        <div class="footer_right">
          <VueSwitch
            :model-value="CONFIG.MODE === 'development'"
            checked-color="violet"
            :size="'14px'"
            @change="handleChangeMode"
          />
        </div>
      </footer>
    </div>
  </main>

  <div v-if="loading" class="loading-mask" role="status" aria-live="polite">
    <div class="loading-card">
      <span class="spinner"></span>
      <strong>Processing request...</strong>
    </div>
  </div>
</template>

<style>
main {
  display: flex;
  height: 100vh;
  header {
    height: 50px;
  }

  .app_wrapper {
    flex: 1;

    header {
      height: 50px;
      overflow: auto;
      border-bottom: 1px solid var(--c-border);
    }
    .app_content {
      height: calc(100vh - 50px - 40px);
      padding: 1rem;
      overflow: auto;
    }
    footer {
      height: 40px;
      border-top: 1px solid var(--c-border);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      background: color-mix(in srgb, var(--color-background-elevated) 84%, transparent);

      .footer_left {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 0.9rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
      }

      .footer_right {
        padding: 0;
      }
    }
  }
}

.loading-mask {
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(0, 0, 0, 0.18);
  display: grid;
  place-items: center;

  .loading-card {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    border: 1px solid var(--c-border);
    border-radius: 12px;
    padding: 0.75rem 0.95rem;
    background: var(--c-surface-1);
    color: var(--c-text);

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid var(--c-border);
      border-top-color: var(--c-primary);
      border-radius: 50%;
      animation: spin 0.75s linear infinite;
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
