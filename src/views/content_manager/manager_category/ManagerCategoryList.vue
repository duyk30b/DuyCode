<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCategoryStore } from '@/stores/category.store.ts'
import { VueButton } from '@/common/vue-form'
import ManagerCategoryTree from './ManagerCategoryTree.vue'
import ModalCategoryUpsert from './ModalCategoryUpsert.vue'

const modalCategoryUpsert = ref<InstanceType<typeof ModalCategoryUpsert>>()

const categoryStore = useCategoryStore()

const startFetchData = async () => {
  await categoryStore.loadCategoryMenuTree({ cache: 'reload' })
}

onMounted(async () => {
  await startFetchData()
})

const handleModalCategoryUpsertSuccess = async () => {
  await startFetchData()
}
</script>

<template>
  <ModalCategoryUpsert ref="modalCategoryUpsert" @success="handleModalCategoryUpsertSuccess" />
  <section class="manager-category-page">
    <div>
      <div class="flex gap-4 items-center">
        <h1>Category Manager</h1>
        <VueButton color="blue" @click="modalCategoryUpsert?.openModal('CREATE')">CREATE</VueButton>
      </div>
      <p>Manage nested categories. Folder name will always match slug.</p>
    </div>
    <div class="mt-4">
      <ManagerCategoryTree
        :categoryMenuList="categoryStore.categoryMenuTree"
        @edit-category="modalCategoryUpsert?.openModal('UPDATE', $event)"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.manager-category-page {
  padding: 1rem;
}

h1 {
  margin: 0;
}

p {
  margin: 0.3rem 0 0;
  color: var(--c-text-soft);
}
</style>
