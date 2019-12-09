import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const last = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

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
  }
]

export const asyncRoutes = [
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
        meta: { title: '管理员' }
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/system/menu-list'),
        meta: { title: '菜单' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system/role-list'),
        meta: { title: '角色' }
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
        name: 'merchant1',
        component: () => import('@/views/merchant/merchant'),
        meta: { title: '百货入驻审核', icon: 'table' }
      },
      {
        path: 'store',
        name: 'store',
        component: () => import('@/views/store/store-list'),
        meta: { title: '店铺审核', icon: 'table' }
      },
      {
        path: 'McLocal',
        name: 'McLocal',
        component: () => import('@/views/McLocal/McLocal'),
        meta: { title: '生活圈入驻审核', icon: 'table' }
      },
      {
        path: 'merchant-type',
        name: 'merchant-type',
        component: () => import('@/views/merchant/manage-type'),
        meta: { title: '经营类型' }
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
        name: 'member1',
        component: () => import('@/views/member/member'),
        meta: { title: '会员列表' }
      },
      {
        path: 'insured',
        name: 'insured',
        component: () => import('@/views/insured/insured'),
        meta: { title: '参保人列表' }
      }
    ]
  },
  {
    path: '/salvation',
    component: Layout,
    redirect: '/salvation/salvation',
    name: 'salvation',
    meta: { title: '心安慈善管理', icon: 'example' },
    children: [
      {
        path: 'salvation',
        name: 'salvation1',
        component: () => import('@/views/salvation/salvation'),
        meta: { title: '救助列表' }
      }
    ]
  },
  {
    path: '/charitable',
    name: 'charitable',
    component: Layout,
    redirect: '/charitable/charitable',
    meta: { title: '政府慈善公益', icon: 'example' },
    children: [
      {
        path: 'public',
        name: 'public',
        component: () => import('@/views/charitable/public'),
        meta: { title: '公益列表' }
      },
      {
        path: 'article',
        name: 'article',
        component: () => import('@/views/charitable/article'),
        meta: { title: '文章列表' }
      }
    ]
  },
]

const createRouter = (menus) => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: menus == null ? constantRoutes : constantRoutes.concat(menus).concat(last)
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter(menus) {
  const newRouter = createRouter(menus)
  router.matcher = newRouter.matcher // reset router
  router.options.routes = newRouter.options.routes
}

export default router
