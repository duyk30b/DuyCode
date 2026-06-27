<script setup lang="ts">
import { VueSidebar } from '@/common/vue-sidebar'
import { useCategoryStore } from '@/stores/category.store'
import { usePostStore } from '@/stores/post.store'
import { useRoute } from 'vue-router'
import type { MenuItem } from './AppSidebarMenuItem.vue'
import { markRaw, ref, shallowRef, watch } from 'vue'
import { ROUTER_NAME } from '@/router'
import type { CategoryMenu } from '@/model/category_menu.model'
import AppSidebarMenuItem from './AppSidebarMenuItem.vue'
import { IconHospitalUser } from '@/common/icon/icon-font-awesome'
import { IconForm, IconHome, IconOneToOne } from '@/common/icon/icon-antd'

const route = useRoute()
const categoryStore = useCategoryStore()
const postStore = usePostStore()
const menu = ref<MenuItem[]>([])

watch(
  () => route.path,
  async (path) => {
    menu.value = [{ level: 1, icon: shallowRef(IconHome), label: 'HOME', to: { name: ROUTER_NAME.HOME }, children: [] }]
    if (path.startsWith('/manager/')) {
      const menuItemList = [
        {
          level: 1,
          icon: shallowRef(IconOneToOne),
          label: 'Category List',
          to: { name: ROUTER_NAME.MANAGER_CATEGORY_LIST },
          children: [],
        },
        {
          level: 1,
          icon: shallowRef(IconForm),
          label: 'Post Upsert',
          to: { name: ROUTER_NAME.MANAGER_POST_UPSERT },
          children: [],
        },
      ]
      menu.value.push(...menuItemList)
    } else if (path.startsWith('/blogs/category')) {
      const menuItemTree: MenuItem[] = []
      const mapMenu = (miList: MenuItem[], ciList: CategoryMenu[], level: number) => {
        ciList.forEach((categoryInfo) => {
          const menuItem: MenuItem = {
            level,
            label: categoryInfo.title,
            icon: level === 1 ? markRaw(IconOneToOne) : undefined,
            to: {
              name: ROUTER_NAME.BLOGS_CATEGORY_VIEW,
              params: { pathMatch: categoryInfo.folderPath.split('/').filter(Boolean) }, // thêm filter vì router tự động thêm '/'
            },
            children: [],
          }
          mapMenu(menuItem.children, categoryInfo.categoryList, level + 1)
          miList.push(menuItem)
        })
      }
      mapMenu(menuItemTree, categoryStore.categoryMenuTree, 1)
      menu.value.push(...menuItemTree)
    } else if (path.startsWith('/blogs/post') && path.endsWith('.md')) {
      const filePath = path.replace('/blogs/post', '')
      const folderPath = filePath.split('/').filter(Boolean).slice(0, -1).join('/')
      const postMenuList = await postStore.getPostMenuListByFolderPath(folderPath)
      postMenuList.forEach((postInfo) => {
        menu.value.push({
          level: 1,
          label: `${postInfo.order}. ${postInfo.title}`,
          icon: markRaw(IconForm),
          to: {
            name: ROUTER_NAME.BLOGS_POST_VIEW,
            params: { pathMatch: postInfo.filePath.split('/').filter(Boolean) },
          },
          children: [],
        })
      })
    }
  },
  { immediate: true },
)
</script>

<template>
  <VueSidebar ref="vueSidebar">
    <div class="brand" @click="$router.push({ name: ROUTER_NAME.HOME })">
      <span class="brand_icon">
        <IconHospitalUser />
      </span>
      <span class="brand_text hide_on_minimize">
        <strong>DuyCode</strong>
        <small>Looking for new solutions</small>
      </span>
    </div>
    <section class="pt-4 px-3">
      <AppSidebarMenuItem :menu-item-list="menu" />
    </section>
  </VueSidebar>
</template>

<style>
.brand {
  height: 50px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  cursor: pointer;

  .brand_icon {
    font-size: 32px;
    color: var(--color-text);
    display: grid;
    place-items: center;
  }

  .brand_text {
    display: flex;
    flex-direction: column;
    line-height: 1.15;
    color: var(--color-text);
    strong {
      font-size: 12px;
      letter-spacing: 0.2px;
      text-transform: uppercase;
    }

    small {
      font-size: 12px;
      letter-spacing: 0.6px;
    }
  }
}
</style>
