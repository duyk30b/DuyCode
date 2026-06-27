import { reactive, ref } from 'vue'

export const sidebarState = reactive({
  isMobile: false,
  isMinimized: false,
  isVisible: false,
})

export const SidebarActions = {
  toggleSidebar: () => {
    sidebarState.isVisible = !sidebarState.isVisible
  },
  toggleMinimized: () => {
    sidebarState.isMinimized = !sidebarState.isMinimized
  },
}
