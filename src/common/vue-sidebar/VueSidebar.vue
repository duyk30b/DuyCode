<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { IconLeft, IconRight } from '../icon/icon-antd'
import { SidebarActions, sidebarState } from './vue-sidebar.store'

interface Props {
  width?: string
  desktopBreakpoint?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: '260px',
  desktopBreakpoint: 1024,
})

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    sidebarState.isVisible = false
  }
}

const onResize = () => {
  if (window.innerWidth >= props.desktopBreakpoint) {
    sidebarState.isMobile = false
  } else {
    sidebarState.isMobile = true
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('resize', onResize)

  if (window.innerWidth <= props.desktopBreakpoint) {
    sidebarState.isMobile = true
    sidebarState.isVisible = false
  } else {
    sidebarState.isMobile = false
    sidebarState.isVisible = true
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <Transition v-if="sidebarState.isMobile && sidebarState.isVisible" name="sidebar-fade">
    <div class="sidebar-overlay" @click="SidebarActions.toggleSidebar()" />
  </Transition>

  <aside
    :class="{
      sidebar_container: true,
      sidebar_minimized: sidebarState.isMinimized,
      sidebar_desktop: !sidebarState.isMobile,
      sidebar_mobile: sidebarState.isMobile,
      sidebar_visible: sidebarState.isVisible,
    }"
  >
    <div class="sidebar_content">
      <slot />
    </div>
    <div class="sidebar_bottom" @click="SidebarActions.toggleMinimized()">
      <IconLeft v-if="!sidebarState.isMinimized" style="color: #333; font-size: 20px" />
      <IconRight v-else style="color: #333; font-size: 20px" />
    </div>
  </aside>
</template>

<style lang="scss">
.sidebar_container {
  --sidebar-color-border: var(--color-border, #d0d7de);
  --sidebar-color-background: var(--color-background-elevated, #ffffff);

  background: var(--sidebar-color-background);
  border-right: 1px solid var(--sidebar-color-border);
  height: 100%;
  transition-property: transform, width;
  transition-duration: 0.28s;
  transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
  transition-delay: 0s;
  will-change: transform, width;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  width: v-bind('props.width');

  .sidebar_content {
    flex: 1;
    overflow-y: auto;
  }

  .sidebar_bottom {
    flex: 0 0 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--sidebar-color-border);
    cursor: pointer;
  }

  &.sidebar_minimized {
    width: 60px;
    .hide_on_minimize {
      display: none;
    }
  }

  &.sidebar_mobile {
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
    transform: translateX(-100%);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    &.sidebar_visible {
      transform: translateX(0);
    }
  }

  &.sidebar_desktop {
    position: relative;
    transform: translateX(-100%);
    &.sidebar_visible {
      transform: translateX(0);
    }
    &:not(.sidebar_visible) {
      width: 0;
    }
  }
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
}

.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: opacity 0.25s;
}

.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  opacity: 0;
}
</style>
