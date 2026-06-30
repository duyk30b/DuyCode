<script setup lang="ts">
import { CategoryMenu } from '@/model/category_menu.model.ts'
import type { PostMenu } from '@/model/post_menu.model.ts'
import { ROUTER_NAME } from '@/router.ts'
import { useAuthStore } from '@/stores/auth.store.ts'
import { useCategoryStore } from '@/stores/category.store.ts'
import { usePostStore } from '@/stores/post.store.ts'
import { ESTimer } from '@/utils/timer.util.ts'
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Breadcrumb from './Breadcrumb.vue'

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()
const categoryStore = useCategoryStore()
const postStore = usePostStore()

const categoryCurrent = ref(CategoryMenu.blank())
const postMenuList = ref<PostMenu[]>([])

const loadingPost = ref(false)

type TreeLine = {
  key: string
  title: string
  folderPath: string
  prefix: string
}

const categoryTreeTitle = computed(() => categoryCurrent.value.title || categoryCurrent.value.folderPath || 'root')

const treeLines = computed<TreeLine[]>(() => {
  const lines: TreeLine[] = []

  const walk = (nodes: CategoryMenu[], ancestorHasMore: boolean[]) => {
    nodes.forEach((node, index) => {
      const isLast = index === nodes.length - 1
      const prefix = `${ancestorHasMore.map((hasMore) => (hasMore ? '│   ' : '    ')).join('')}${ancestorHasMore.length > 0 ? (isLast ? '└── ' : '├── ') : ''}`

      lines.push({
        key: node.folderPath,
        title: node.title,
        folderPath: node.folderPath,
        prefix,
      })

      if (node.categoryList.length > 0) {
        walk(node.categoryList, [...ancestorHasMore, !isLast])
      }
    })
  }

  walk(categoryCurrent.value.categoryList, [])

  return lines
})

watch(
  () => route.path,
  async (path) => {
    try {
      loadingPost.value = true
      const segmentList = path.replace('/blogs/category', '').split('/')
      let folderPath = segmentList.join('/')
      categoryCurrent.value = categoryStore.getCategoryMenuByFolderPath(folderPath)

      if (categoryCurrent.value.folderPath !== '/' && categoryCurrent.value.folderPath !== '') {
        postMenuList.value = await postStore.getPostMenuListByFolderPath(categoryCurrent.value.folderPath)
      } else {
        postMenuList.value = []
      }
    } catch (error) {
      console.log('🚀 ~ error:', error)
      postMenuList.value = []
    } finally {
      loadingPost.value = false
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="category-page">
    <div class="toolbar">
      <Breadcrumb />
      <RouterLink
        v-if="authStore.isAuthenticated && categoryCurrent.folderPath !== '/' && categoryCurrent.folderPath !== ''"
        class="small"
        :to="{
          name: ROUTER_NAME.MANAGER_POST_UPSERT,
          query: { mode: 'CREATE', parentPath: categoryCurrent.folderPath },
        }"
      >
        Create Post
      </RouterLink>
    </div>

    <section class="panel">
      <div class="tree-shell">
        <div class="tree-root-label">{{ categoryTreeTitle }}</div>
        <ul v-if="treeLines.length > 0" class="tree-lines">
          <li v-for="line in treeLines" :key="line.key" class="tree-line">
            <span class="tree-prefix">{{ line.prefix }}</span>
            <RouterLink class="tree-link" :to="`/blogs/category/${line.folderPath}`">{{ line.title }}</RouterLink>
          </li>
        </ul>
        <p v-else class="empty">No sub category yet.</p>
      </div>
    </section>

    <section class="panel">
      <h2>
        <span>Posts</span>
        <span v-if="loadingPost" class="italic ml-2">(Loading...)</span>
      </h2>
      <div class="list" v-if="!loadingPost">
        <RouterLink v-for="post in postMenuList" :key="post.filePath" class="item" :to="`/blogs/post${post.filePath}`">
          <strong>{{ post.order }}. {{ post.title }}</strong>
          <span>{{ ESTimer.timeToText(post.publishedAt, 'hh:mm DD/MM/YYYY') }}</span>
        </RouterLink>
        <p v-if="postMenuList.length === 0" class="empty">No post in this category.</p>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.category-page {
  display: grid;
  gap: 1rem;
  padding: 1rem;

  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .panel {
    border: 1px solid var(--c-border);
    border-radius: 16px;
    padding: 0.95rem;
    background: var(--c-bg-elevated);
    box-shadow: var(--shadow-soft);
  }
}

h2 {
  margin: 0;
  margin-bottom: 0.75rem;
  font-size: 1.02rem;
}

.tree-shell {
  padding: 0.1rem 0 0;
}

.tree-root-label {
  margin-bottom: 0.6rem;
  color: var(--c-text);
  font-weight: 700;
  letter-spacing: 0.01em;
}

.tree-lines {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.1rem;
  font-family: ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.94rem;
  line-height: 1.55;
}

.tree-line {
  display: flex;
  align-items: flex-start;
  min-height: 1.6rem;
}

.tree-prefix {
  color: var(--c-text-soft);
  white-space: pre;
  user-select: none;
  flex: none;
}

.tree-link {
  color: var(--c-text);
  text-decoration: none;
  border-radius: 8px;
  padding: 0 0.2rem;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;
}

.tree-link:hover {
  color: var(--c-primary);
  background: color-mix(in srgb, var(--c-primary) 10%, transparent);
}

.list {
  display: grid;
  gap: 0.6rem;
}

.item {
  border: 1px solid var(--c-border);
  border-radius: 12px;
  padding: 0.65rem;
  text-decoration: none;
  color: var(--c-text-soft);
  background: var(--c-surface-1);
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--c-primary);
    color: var(--c-primary);
    transform: translateY(-1px);
  }

  strong {
    color: var(--c-text);
  }
}

.item span {
  color: var(--c-text-soft);
  font-size: 0.88rem;
}

.empty {
  margin: 0;
  color: var(--c-text-soft);
  font-style: italic;
}
</style>
