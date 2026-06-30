<script setup lang="ts">
import { IconLogout, IconMenuFold, IconMenuUnfold, IconTool, IconUser } from '@/common/icon/icon-antd'
import { IconContrast, IconLink2 } from '@/common/icon/icon-google'
import { VueDropdown } from '@/common/vue-overlay'
import { SidebarActions, sidebarState } from '@/common/vue-sidebar'
import { LocalStorageKeys } from '@/config'
import { ROUTER_NAME } from '@/router'
import { useAuthStore } from '@/stores/auth.store'
import { useThemeStore } from '@/stores/theme.store'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ModalLogin from './ModalLogin.vue'

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
  <header class="app_header">
    <div class="flex items-center gap-1">
      <button class="mr-2 menu-toggle" type="button" @click="SidebarActions.toggleSidebar()">
        <IconMenuUnfold v-if="!sidebarState.isVisible" style="font-size: 18px" />
        <IconMenuFold v-else style="font-size: 18px" />
      </button>
      <nav class="app_header_menu">
        <div class="item">
          <RouterLink class="top" :to="{ name: ROUTER_NAME.BLOGS }">Blogs</RouterLink>
        </div>
        <VueDropdown :position="{ horizontal: 'start', vertical: 'bottom' }" showOnHover>
          <template #trigger>
            <div class="item">
              <IconTool />
              <span class="ml-1">Tools</span>
            </div>
          </template>
          <div class="">
            <div class="flex items-center gap-1 px-4 py-2">
              <RouterLink class="top" :to="{ name: ROUTER_NAME.TOOLS_HTML_EDITOR }">HTML Editor</RouterLink>
            </div>
            <div class="flex items-center gap-1 px-4 py-2">
              <RouterLink class="top" :to="{ name: ROUTER_NAME.TOOLS_TYPESCRIPT_EDITOR }">TypeScript Editor</RouterLink>
            </div>
          </div>
        </VueDropdown>
        <div class="item">
          <RouterLink class="top" :to="{ name: ROUTER_NAME.GAMES }">Games</RouterLink>
        </div>
        <VueDropdown :position="{ horizontal: 'start', vertical: 'bottom' }" showOnHover>
          <template #trigger>
            <div class="item">
              <IconLink2 style="font-size: 18px" />
              <span class="ml-1">Link</span>
            </div>
          </template>
          <div class="">
            <div class="flex items-center gap-1 px-4 py-2">
              <a href="./tools/html-editor.v2.1.html" target="_blank">
                <IconLink2 style="font-size: 18px" />
                <span class="ml-1">HTML Editor v2.1</span>
              </a>
            </div>
            <div class="flex items-center gap-1 px-4 py-2">
              <a href="./tools/html-editor.v2.2.html" target="_blank">
                <IconLink2 style="font-size: 18px" />
                <span class="ml-1">HTML Editor v2.2</span>
              </a>
            </div>
            <div class="flex items-center gap-1 px-4 py-2">
              <a href="./tools/html.html" target="_blank">
                <IconLink2 style="font-size: 18px" />
                <span class="ml-1">HTML</span>
              </a>
            </div>
            <div class="flex items-center gap-1 px-4 py-2">
              <a href="./tools/postgres.html" target="_blank">
                <IconLink2 style="font-size: 18px" />
                <span>Postgres</span>
              </a>
            </div>
            <div class="flex items-center gap-1 px-4 py-2">
              <a href="./tools/typescript.html" target="_blank">
                <IconLink2 style="font-size: 18px" />
                <span class="ml-1">TypeScript</span>
              </a>
            </div>
          </div>
        </VueDropdown>
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
.app_header {
  padding: 0 1.2rem;
  display: flex;
  justify-content: space-between;
  gap: 1.2rem;

  background: color-mix(in srgb, var(--color-background-elevated) 84%, transparent);
  backdrop-filter: blur(12px);

  .app_header_menu {
    display: flex;
    align-items: center;
    gap: 1rem;

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
  .header {
    padding-inline: 0.8rem;
  }
}
</style>
