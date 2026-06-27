<script setup lang="ts">
import { onBeforeMount } from 'vue'
import VueAlertStore from './common/vue-alert/VueAlertStore.vue'
import VueModalStore from './common/vue-modal/VueModalStore.vue'
import { useThemeStore } from './stores/theme.store'
import MainLayout from './views/MainLayout.vue'

const themeStore = useThemeStore()

onBeforeMount(() => {
  themeStore.initializeTheme()
})
</script>

<template>
  <MainLayout />
  <VueModalStore />
  <VueAlertStore />
</template>
