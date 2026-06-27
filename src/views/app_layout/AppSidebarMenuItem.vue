<script setup lang="ts">
import { useRoute } from 'vue-router'

export type MenuItem = {
  level: number
  icon?: Object
  label: string
  to: { name: string; params?: Record<string, any> }
  children: MenuItem[]
}

const props = withDefaults(
  defineProps<{
    menuItemList?: MenuItem[]
  }>(),
  { menuItemList: () => [] },
)

const route = useRoute()

const isCurrentRoute = (menuItem: MenuItem) => {
  if (route.name !== menuItem.to.name) {
    return false
  }
  if (menuItem.to.params?.pathMatch) {
    const pathMatchString = ((route.params.pathMatch || []) as string[]).join('/')
    if (pathMatchString !== route.fullPath) {
      return false
    }
  }
  return true
}
</script>

<template>
  <div v-for="(menuItem, index) in menuItemList" :key="index">
    <div
      :to="menuItem.to"
      class="menu-item flex items-center gap-2"
      :class="{ 'router-link-active': isCurrentRoute(menuItem) }"
      @click="$router.push(menuItem.to)"
    >
      <template v-if="menuItem.icon">
        <component :is="menuItem.icon" style="font-size: 16px; flex: 0 0 auto" />
      </template>
      <span class="hide_on_minimize">{{ menuItem.label }}</span>
    </div>
    <div v-if="menuItem.children.length" class="menu-children">
      <AppSidebarMenuItem :menu-item-list="menuItem.children" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-item {
  padding: 0.5rem 0.5rem 0.4em 0.5rem;
  color: var(--c-text-soft);
  border-radius: 6px;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: var(--c-border);
    color: var(--c-text);
    background: var(--c-surface-1);
  }
}

.menu-children {
  margin: 0.14rem 0 0.32rem;
  padding-left: 0.7rem;
  border-left: 1px dashed var(--c-border);
}

.menu-item.router-link-active {
  border-color: color-mix(in srgb, var(--c-primary) 45%, var(--c-border));
  background: color-mix(in srgb, var(--c-primary) 16%, transparent);
  color: var(--c-primary);
}
</style>
