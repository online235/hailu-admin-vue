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
    meta: { title: '系统管理', icon: 'system_setting' },
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/system/admin-list'),
        meta: { title: '管理员', icon: 'admin' }
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/system/menu-list'),
        meta: { title: '菜单', icon: 'menu' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system/role-list'),
        meta: { title: '角色', icon: 'role' }
      },
      {
        path: 'dict',
        name: 'dict',
        component: () => import('@/views/system/dict-list'),
        meta: { title: '字典', icon: 'dict' }
      }
    ]
  },
  {
    path: '/merchant',
    component: Layout,
    redirect: '/merchant/list',
    name: 'merchant',
    meta: { title: '商户管理', icon: 'merchant' },
    children: [
      {
        path: 'merchant',
        name: 'merchant1',
        component: () => import('@/views/merchant/merchant'),
        meta: { title: '百货入驻审核', icon: 'review' }
      },
      {
        path: 'store',
        name: 'store',
        component: () => import('@/views/store/store-list'),
        meta: { title: '店铺审核', icon: 'review' }
      },
      {
        path: 'McLocal',
        name: 'McLocal',
        component: () => import('@/views/McLocal/McLocal'),
        meta: { title: '生活圈入驻审核', icon: 'review' }
      },
      {
        path: 'merchant-type',
        name: 'merchant-type',
        component: () => import('@/views/merchant/manage-type'),
        meta: { title: '经营类型', icon: 'type' }
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    redirect: '/member/table',
    name: 'member',
    meta: { title: '心安&海露会员', icon: 'xinan' },
    children: [
      {
        path: 'member',
        name: 'member1',
        component: () => import('@/views/member/member'),
        meta: { title: '会员列表', icon: 'member' }
      },
      {
        path: 'insured',
        name: 'insured',
        component: () => import('@/views/insured/insured'),
        meta: { title: '参保人列表', icon: 'insured' }
      },
      {
        path: 'serviceProviders',
        name: 'serviceProviders',
        component: () => import('@/views/serviceProviders/serviceProviders'),
        meta: { title: '服务商列表' }
      }
    ]
  },
  {
    path: '/salvation',
    component: Layout,
    redirect: '/salvation/salvation',
    name: 'salvation',
    meta: { title: '心安救助管理', icon: 'xinan' },
    children: [
      {
        path: 'salvation',
        name: 'salvation1',
        component: () => import('@/views/salvation/salvation'),
        meta: { title: '救助列表', icon: 'list_query' }
      },
      {
        path: 'Casehistory',
        name: 'Casehistory',
        component: () => import('@/views/salvation/Casehistory'),
        meta: { title: '救助案例', icon: 'case' }
      },
      {
        path: 'periods',
        name: 'periods',
        component: () => import('@/views/salvation/periods'),
        meta: { title: '期数统计', icon: 'statistics' }
      }
    ]
  },
  {
    path: '/Tag',
    component: Layout,
    redirect: '/Tag/Tag',
    name: 'Tag',
    meta: { title: '标签管理', icon: 'tag' },
    children: [
      {
        path: 'Tag',
        name: 'Tag1',
        component: () => import('@/views/Tag/Tag'),
        meta: { title: '标签管理' }
      }
    ]
  },
  {
    path: '/multimedia',
    component: Layout,
    redirect: '/multimedia/multimedia',
    name: 'multimedia',
    meta: { title: '多媒体管理', icon: 'ad' },
    children: [
      {
        path: 'advertising',
        name: 'advertising',
        component: () => import('@/views/multimedia/advertising'),
        meta: { title: '广告管理' }
      }
    ]
  },
  {
    path: '/charitable',
    name: 'charitable',
    component: Layout,
    redirect: '/charitable/charitable',
    meta: { title: '政府慈善公益', icon: 'public_welfare' },
    children: [
      {
        path: 'public',
        name: 'public',
        component: () => import('@/views/charitable/public'),
        meta: { title: '公益列表', icon: 'list_query' }
      },
      {
        path: 'article',
        name: 'article',
        component: () => import('@/views/charitable/article'),
        meta: { title: '文章列表', icon: 'list_query' }
      },
      {
        path: 'myEssay',
        name: 'myEssay',
        component: () => import('@/views/charitable/myEssay'),
        meta: { title: '账号公益信息', icon: 'account_info' }
      }
    ]
  },
  {
    path: '/version',
    name: 'version',
    component: Layout,
    redirect: '/version/versiontable',
    meta: { title: 'App管理', icon: 'version' },
    children: [
      {
        path: 'version',
        name: 'version',
        component: () => import('@/views/version/version'),
        meta: { title: '版本管理' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
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
