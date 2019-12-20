import { asyncRoutes } from '@/router'

const initState = {
  menuInit: false
}

function appendToRouter(menuArray, callback) {
  menuArray.forEach(menuItem => {
    for (let routeIdx = 0; routeIdx < asyncRoutes.length; routeIdx++) {
      const routeMenu = asyncRoutes[routeIdx]
      if (routeMenu.path !== menuItem.url) {
        continue
      }
      if (routeMenu.children == null) {
        callback(routeMenu)
        continue
      }
      // 如果有子菜单，目前仅处理两级
      if (menuItem.children == null) {
        continue
      }
      const appendRouter = Object.assign({}, routeMenu)
      appendRouter.children = []
      menuItem.children.forEach(menuChildrenItem => {
        for (let routeChildrenIdx = 0; routeChildrenIdx < routeMenu.children.length; routeChildrenIdx++) {
          const routeChildrenMenu = routeMenu.children[routeChildrenIdx]
          if (routeChildrenMenu.path !== menuChildrenItem.url) {
            continue
          }
          appendRouter.children.push(routeChildrenMenu)
        }
      })
      if (appendRouter.children.length === 0) {
        continue
      }
      callback(appendRouter)
    }
  })
}

export default {
  initState,
  appendToRouter
}
