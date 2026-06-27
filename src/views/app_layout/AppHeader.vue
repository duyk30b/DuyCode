<script setup lang="ts">
import { IconLogout, IconMenuFold, IconMenuUnfold, IconUser } from '@/common/icon/icon-antd'
import { IconContrast } from '@/common/icon/icon-google'
import { VueDropdown } from '@/common/vue-overlay'
import { LocalStorageKeys } from '@/config'
import { ROUTER_NAME } from '@/router'
import { useAuthStore } from '@/stores/auth.store'
import { useThemeStore } from '@/stores/theme.store'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ModalLogin from './ModalLogin.vue'
import { sidebarState, SidebarActions } from '@/common/vue-sidebar'

const modalLogin = ref<InstanceType<typeof ModalLogin>>()

const authStore = useAuthStore()
const themeStore = useThemeStore()

const handleClickLogout = () => {
  authStore.logout()
  localStorage.removeItem(LocalStorageKeys.token)
}
</script>

<template>
  <ModalLogin ref="modalLogin" />
  <header class="header">
    <div class="flex items-center gap-1">
      <button class="mr-2 menu-toggle" type="button" @click="SidebarActions.toggleSidebar()">
        <IconMenuUnfold v-if="!sidebarState.isVisible" style="font-size: 18px" />
        <IconMenuFold v-else style="font-size: 18px" />
      </button>
      <nav class="menu">
        <div class="item">
          <RouterLink class="top" :to="{ name: ROUTER_NAME.BLOGS }">Blogs</RouterLink>
        </div>
        <div class="item">
          <RouterLink class="top" :to="{ name: ROUTER_NAME.TOOLS }">Tools</RouterLink>
        </div>
        <div class="item">
          <RouterLink class="top" :to="{ name: ROUTER_NAME.GAMES }">Games</RouterLink>
        </div>
      </nav>
    </div>

    <div class="flex items-center gap-1">
      <div @click="themeStore.toggleTheme()" style="cursor: pointer">
        <IconContrast :width="32" :height="32" />
      </div>
      <button v-if="!authStore.isAuthenticated" class="btn primary" @click="modalLogin?.openModal()">
        GitHub Login
      </button>
      <VueDropdown v-if="authStore.isAuthenticated">
        <template #trigger>
          <div class="flex items-center gap-1 user-chip">
            <IconUser />
            <span>{{ authStore.username }}</span>
          </div>
        </template>
        <div class="">
          <div class="flex items-center gap-1 px-4 py-2">
            <RouterLink :to="{ name: ROUTER_NAME.MANAGER }">Manager</RouterLink>
          </div>
          <div class="flex items-center gap-1 px-4 py-2" @click="handleClickLogout">
            <IconLogout />
            <span>Đăng xuất</span>
          </div>
        </div>
      </VueDropdown>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding: 0 1.2rem;
  display: flex;
  justify-content: space-between;
  gap: 1.2rem;

  background: color-mix(in srgb, var(--color-background-elevated) 84%, transparent);
  backdrop-filter: blur(12px);

  .menu {
    display: flex;
    align-items: center;
    gap: 0.28rem;

    .item {
      position: relative;

      .top {
        color: var(--c-text-soft);
        text-decoration: none;
        padding: 0.34rem 0.64rem;
        border-radius: 999px;
        border: 1px solid transparent;
        transition: all 0.2s ease;
      }

      .top:hover {
        background: var(--c-surface-1);
        border-color: var(--c-border);
        color: var(--c-primary);
      }
    }
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--c-border);
  border-radius: 999px;
  padding: 0.42rem 0.78rem;
  cursor: pointer;
  background: var(--c-surface-1);
  color: var(--c-text);
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--c-primary);
    color: var(--c-primary);
  }
}

.primary {
  background: var(--c-primary);
  border-color: var(--c-primary);
  color: #fff;

  &:hover {
    color: #fff;
    filter: brightness(1.04);
  }
}

.auth {
  position: relative;
  display: flex;
  align-items: center;
}

.user-chip {
  border: 1px solid var(--c-border);
  border-radius: 999px;
  padding: 0.42rem 0.75rem;
  background: var(--c-surface-1);
  color: var(--c-text);
  cursor: pointer;
}

.error-text {
  margin: 0.5rem 0 0;
  color: #c0392b;
}

.actions {
  margin-top: 0.8rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

@media (max-width: 960px) {
  :deep(.menu),
  .search-box {
    display: none;
  }

  .header {
    padding-inline: 0.8rem;
  }
}
</style>
