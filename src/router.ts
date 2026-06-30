import { createRouter, createWebHashHistory } from 'vue-router'
import BlogsContainer from './views/content_blogs/BlogsContainer.vue'
import GamesContainer from './views/content_games/GamesContainer.vue'
import ManagerCategoryList from './views/content_manager/manager_category/ManagerCategoryList.vue'
import ManagerPostUpsert from './views/content_manager/manager_post/ManagerPostUpsert.vue'
import ManagerContainer from './views/content_manager/ManagerContainer.vue'
import ToolsContainer from './views/content_tools/ToolsContainer.vue'
import BlogsCategoryView from './views/content_blogs/BlogsCategoryView.vue'
import BlogPostView from './views/content_blogs/BlogPostView.vue'
import ToolsHTMLEditor from './views/content_tools/ToolsHTMLEditor.vue'
import ToolsTypescriptEditor from './views/content_tools/ToolsTypescriptEditor.vue'

export const ROUTER_NAME = {
  HOME: 'HOME',
  BLOGS: 'BLOGS',
  BLOGS_CATEGORY_VIEW: 'BLOGS_CATEGORY_VIEW',
  BLOGS_POST_VIEW: 'BLOGS_POST_VIEW',
  MANAGER: 'MANAGER',
  MANAGER_CATEGORY_LIST: 'MANAGER_CATEGORY_LIST',
  MANAGER_POST_UPSERT: 'MANAGER_POST_UPSERT',
  TOOLS: 'TOOLS',
  TOOLS_HTML_EDITOR: 'TOOLS_HTML_EDITOR',
  TOOLS_TYPESCRIPT_EDITOR: 'TOOLS_TYPESCRIPT_EDITOR',
  GAMES: 'GAMES',
} as const

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: ROUTER_NAME.HOME,
      redirect: () => ({ name: ROUTER_NAME.BLOGS }),
    },
    {
      path: '/blogs',
      name: ROUTER_NAME.BLOGS,
      component: BlogsContainer,
      redirect: () => ({ name: ROUTER_NAME.BLOGS_CATEGORY_VIEW, params: { pathMatch: [] } }),
      children: [
        {
          path: 'category/:pathMatch(.*)*',
          name: ROUTER_NAME.BLOGS_CATEGORY_VIEW,
          component: BlogsCategoryView,
          props: true,
        },
        {
          path: 'post/:pathMatch(.*)*',
          name: ROUTER_NAME.BLOGS_POST_VIEW,
          component: BlogPostView,
          props: true,
        },
      ],
    },
    {
      path: '/manager',
      name: ROUTER_NAME.MANAGER,
      component: ManagerContainer,
      redirect: () => ({ name: ROUTER_NAME.MANAGER_CATEGORY_LIST }),
      children: [
        {
          path: 'category',
          name: ROUTER_NAME.MANAGER_CATEGORY_LIST,
          component: ManagerCategoryList,
        },
        {
          path: 'post',
          name: ROUTER_NAME.MANAGER_POST_UPSERT,
          component: ManagerPostUpsert,
        },
      ],
    },
    {
      path: '/tools',
      name: ROUTER_NAME.TOOLS,
      component: ToolsContainer,
      redirect: () => ({ name: ROUTER_NAME.TOOLS_HTML_EDITOR }),
      children: [
        {
          path: 'html-editor',
          name: ROUTER_NAME.TOOLS_HTML_EDITOR,
          component: ToolsHTMLEditor,
          props: true,
        },
        {
          path: 'typescript-editor',
          name: ROUTER_NAME.TOOLS_TYPESCRIPT_EDITOR,
          component: ToolsTypescriptEditor,
          props: true,
        },
      ],
    },
    {
      path: '/games',
      name: ROUTER_NAME.GAMES,
      component: GamesContainer,
      props: true,
    },
  ],
})
