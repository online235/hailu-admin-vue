import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/common/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/admin',
    name: 'system',
    meta: { title: '系统管理', icon: 'example' },
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/system/admin-list'),
        meta: { title: '管理员', icon: 'table' }
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/system/menu-list'),
        meta: { title: '菜单', icon: 'tree' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system/role-list'),
        meta: { title: '角色', icon: 'tree' }
      }
    ]
  },
  {
    path: '/merchant',
    component: Layout,
    redirect: '/merchant/list',
    name: 'merchant',
    meta: { title: '商户管理', icon: 'example' },
    children: [
      {
        path: 'merchant',
        name: 'merchant',
        component: () => import('@/views/merchant/merchant'),
        meta: { title: '百货商户', icon: 'table' }
      },
      {
        path: 'store',
        name: 'store',
        component: () => import('@/views/store/store-list'),
        meta: { title: '店铺管理', icon: 'table' }
      },
      {
        path: 'McLocal',
        name: 'McLocal',
        component: () => import('@/views/McLocal/McLocal'),
        meta: { title: '本地生活圈', icon: 'table' }
      },
      {
        path: 'merchant-type',
        name: 'merchant-type',
        component: () => import('@/views/merchant/manage-type'),
        meta: { title: '经营类型', icon: 'tree' }
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    redirect: '/member/table',
    name: 'member',
    meta: { title: '心安&海露会员', icon: 'example' },
    children: [
      {
        path: 'member',
        name: 'member',
        component: () => import('@/views/member/member'),
        meta: { title: '会员列表', icon: 'table' }
      },
      {
        path: 'insured',
        name: 'insured',
        component: () => import('@/views/insured/insured'),
        meta: { title: '参保人列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/salvation',
    component: Layout,
    redirect: '/salvation/salvation',
    name: 'salvation',
    meta: { title: '救助管理', icon: 'example' },
    children: [
      {
        path: 'salvation',
        name: 'salvation',
        component: () => import('@/views/salvation/salvation'),
        meta: { title: '救助列表', icon: 'table' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
