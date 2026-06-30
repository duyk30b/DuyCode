<script setup lang="ts">
import { sidebarState } from '@/common/vue-sidebar'
import { ROUTER_NAME } from '@/router'
import { onMounted } from 'vue'

onMounted(() => {
  sidebarState.isVisible = false
})
</script>

<template>
  <RouterView />
</template>
