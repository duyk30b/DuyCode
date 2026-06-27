<script setup lang="ts">
import { InputNumber, InputSelect, InputText, type InputSelectOption } from '@/common/vue-form/index.ts'
import InputDate from '@/common/vue-form/InputDate.vue'
import { VueButton } from '@/common/vue-form'
import { MarkdownRenderer } from '@/core/markdown.core.ts'
import type { CategoryMenu } from '@/model/category_menu.model.ts'
import { PostContent } from '@/model/post_content.model.ts'
import { useCategoryStore } from '@/stores/category.store.ts'
import { usePostStore } from '@/stores/post.store.ts'
import { ESString } from '@/utils/string.util.ts'
import MonacoEditor from '@/views/app_components/MonacoEditor.vue'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme.store'
import { ROUTER_NAME } from '@/router'

const route = useRoute()
const router = useRouter()

const themeStore = useThemeStore()
const categoryStore = useCategoryStore()
const postStore = usePostStore()

const postContentOrigin = ref(PostContent.blank())
const postContent = ref(PostContent.blank())

const previewHtml = ref('')
const mode = ref<'CREATE' | 'UPDATE'>('CREATE')
const fetchLoading = ref(false)
const saveLoading = ref(false)

const parentPathOptions = computed(() => {
  const options: InputSelectOption<any>[] = []
  const addOptions = (catMenuList: CategoryMenu[]) => {
    catMenuList.forEach((c) => {
      options.push({
        value: c.folderPath,
        label: `${' -- '.repeat(c.level - 1)} ${c.title}`,
      })
      addOptions(c.categoryList || [])
    })
  }
  addOptions(categoryStore.categoryMenuTree)
  return options
})

onBeforeMount(async () => {
  mode.value = (route.query.mode as 'CREATE' | 'UPDATE') || 'CREATE'
  if (mode.value === 'CREATE') {
    try {
      postContent.value.metadata.publishedAt = new Date().toISOString()
      if (route.query.parentPath) {
        postContent.value.postInfo.parentPath = route.query.parentPath as string
        const postMenuList = await postStore.getPostMenuListByFolderPath(postContent.value.postInfo.parentPath)
        const order = postMenuList.reduce((max, m) => Math.max(max, m.order || 0), 0) + 1
        postContent.value.metadata.order = order
      }
    } catch (error) {
      console.log('🚀 ~ error:', error)
    }
  }
  if (mode.value === 'UPDATE') {
    try {
      fetchLoading.value = true
      const filePath = route.query.filePath as string
      postContentOrigin.value = await postStore.getPostContentByFilePath(filePath, { refetch: true, cache: 'reload' })
      postContent.value = PostContent.from(postContentOrigin.value)
    } catch (error) {
      console.error('Failed to fetch post data for editing:', error)
      window.alert('Failed to fetch post data for editing')
      // router.back()
    } finally {
      fetchLoading.value = false
    }
  }
})

watch(
  () => [postContent.value.metadata.title, postContent.value.postInfo.parentPath],
  ([newTitle, newParentPath]) => {
    const fileName = ESString.slugify(newTitle) + '.md'
    const filePath = ESString.joinPath(newParentPath, fileName)
    postContent.value.postInfo.fileName = fileName
    postContent.value.postInfo.filePath = filePath
  },
)

watch(
  () => postContent.value.body,
  async (body) => {
    const rendered = await MarkdownRenderer.toHtml(postContent.value.body)
    previewHtml.value = rendered.html
  },
  { immediate: true },
)

const handleSave = async () => {
  if (!postContent.value.metadata.title.trim()) {
    return window.alert('Title is required')
  }
  if (!postContent.value.postInfo.parentPath || postContent.value.postInfo.parentPath === '/') {
    return window.alert('Category is required')
  }

  try {
    saveLoading.value = true
    if (mode.value === 'CREATE') {
      await postStore.createPostContent(postContent.value)
    } else if (mode.value === 'UPDATE') {
      if (postContent.value.postInfo.filePath === postContentOrigin.value.postInfo.filePath) {
        await postStore.updatePostContent(postContentOrigin.value, postContent.value)
      } else {
        await postStore.deletePostContent(postContentOrigin.value)
        await postStore.createPostContent(postContent.value)
      }
    } else {
      window.alert('Invalid mode')
      return
    }
    await postStore.getPostMenuListByFolderPath(postContent.value.postInfo.parentPath, {
      refetch: true,
      cache: 'reload',
    })
    router.push({
      name: ROUTER_NAME.BLOGS_POST_VIEW,
      params: { pathMatch: postContent.value.postInfo.filePath.split('/').filter(Boolean) },
      query: { cache: 'reload' },
    })
  } catch (error) {
    console.error('Failed to save post data:', error)
    window.alert('Failed to save post data')
  } finally {
    saveLoading.value = false
  }
}

const clickDelete = async () => {
  const accepted = window.confirm('Delete this post?')
  if (!accepted) {
    return
  }

  try {
    saveLoading.value = true
    await postStore.deletePostContent(postContentOrigin.value)
    await postStore.getPostMenuListByFolderPath(postContentOrigin.value.postInfo.parentPath, {
      refetch: true,
      cache: 'reload',
    })
    await router.push({ path: postContentOrigin.value.postInfo.parentPath, query: { cache: 'reload' } })
  } catch (error) {
    console.error('Failed to delete post data:', error)
    window.alert('Failed to delete post data')
  } finally {
    saveLoading.value = false
  }
}
</script>

<template>
  <section class="editor-page">
    <header class="head">
      <h1 v-if="mode === 'CREATE'">Create New Post</h1>
      <h1 v-if="mode === 'UPDATE'">
        <span>Update Post: </span>
        <span v-if="fetchLoading">Loading...</span>
        <a v-else @click="router.push({ path: postContent.postInfo.filePath, query: { cache: 'reload' } })">
          {{ postContent.postInfo.filePath }}
        </a>
      </h1>
    </header>

    <form @submit.prevent="handleSave">
      <div class="flex flex-wrap items-center gap-4">
        <div style="flex-grow: 1">
          <div>Title</div>
          <div class="bg-white">
            <InputText v-model:value="postContent.metadata.title" required />
          </div>
        </div>
        <div style="flex-grow: 1; min-width: 250px">
          <div>Category</div>
          <div class="bg-white">
            <InputSelect v-model:value="postContent.postInfo.parentPath" :options="parentPathOptions" />
          </div>
        </div>
        <div style="flex-grow: 1; max-width: 100px">
          <div>Order</div>
          <div class="bg-white">
            <InputNumber v-model:value="postContent.metadata.order" />
          </div>
        </div>
        <div style="flex-grow: 1">
          <div>Published date</div>
          <div class="bg-white">
            <InputDate v-model:value="postContent.metadata.publishedAt" type-parser="string" show-time />
          </div>
        </div>
        <div class="ml-auto">
          <div>&nbsp;</div>
          <VueButton color="blue" :loading="saveLoading" type="submit">Save</VueButton>
        </div>
      </div>

      <div class="mt-4 split">
        <MonacoEditor
          v-model:value="postContent.body"
          language="markdown"
          :theme="themeStore.theme === 'DARK' ? 'vs-dark' : 'vs-light'"
        />
        <section class="preview markdown" v-html="previewHtml"></section>
      </div>

      <div class="mt-4 flex items-center">
        <div>
          <VueButton
            v-if="mode === 'UPDATE'"
            class="btn danger"
            :loading="saveLoading"
            type="button"
            @click="clickDelete"
          >
            Delete
          </VueButton>
        </div>
        <div class="ml-auto">
          <VueButton color="blue" :loading="saveLoading" type="submit">Save</VueButton>
        </div>
      </div>
    </form>
  </section>
</template>

<style scoped>
.editor-page {
  display: grid;
  gap: 1rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(130px, 1fr));
  gap: 0.6rem;
}

.danger {
  border-color: #c0392b;
  color: #c0392b;
}

.split {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 0.8rem;
}

.preview {
  border: 1px solid var(--c-border);
  border-radius: 10px;
  padding: 1rem;
  overflow: auto;
  min-height: 62vh;
  background: var(--c-surface-1);
}

.preview :deep(pre) {
  overflow-x: auto;
}

.error {
  color: #c0392b;
}

@media (max-width: 1100px) {
  .split {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
  }
}

@media (max-width: 680px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .head {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }
}
</style>
