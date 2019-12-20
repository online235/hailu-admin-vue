import router from './router'
import store from './store'
import dynamicRoute from '@/utils/dynamicRoute'
import { resetRouter } from '@/router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getAccessToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getAccessToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const menus = store.getters.menus
      if (menus) {
        if (!dynamicRoute.initState.menuInit) {
          const menuArray = menus instanceof Array ? menus : JSON.parse(menus)
          const accessRoutes = []
          dynamicRoute.appendToRouter(menuArray, menu => accessRoutes.push(menu))
          resetRouter(accessRoutes)
          dynamicRoute.initState.menuInit = true
          next(location.href.substring(location.href.indexOf('/#') + 2))
        } else {
          next()
        }
        // try{
        //   let currentPath = location.href.substring(location.href.indexOf("/#") + 2)
        //   if( currentPath !== from.path ){
        //     next(currentPath)
        //   }
        // }catch(err){
        // }
        // next()
        NProgress.done()
      } else {
        dynamicRoute.initState.menuInit = false
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      dynamicRoute.initState.menuInit = false
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
