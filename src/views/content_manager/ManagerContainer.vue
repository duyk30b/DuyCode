<script setup lang="ts">
import { AlertStore } from '@/common/vue-alert'
import { useCategoryStore } from '@/stores/category.store'
import { onBeforeMount, ref } from 'vue'

const loaded = ref(false)
const categoryStore = useCategoryStore()

onBeforeMount(async () => {
  try {
    await categoryStore.loadCategoryMenuTree()
  } catch (error: any) {
    console.log('🚀 ~ ManagerContainer.vue:13 ~ error:', error)
    AlertStore.addError(error.message)
  } finally {
    loaded.value = true
  }
})
</script>

<template>
  <RouterView v-if="loaded" />
</template>
