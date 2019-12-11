const accessTokenKey = 'adminAccessToken'
const refreshTokenKey = 'adminRefreshToken'
const usernameKey = 'adminUsername'
const userImgKey = 'adminUserImg'
const menusKey = 'adminMenus'

export function getAccessToken() {
  return sessionStorage.getItem(accessTokenKey)
}

export function getRefreshToken() {
  return sessionStorage.getItem(refreshTokenKey)
}

export function getUsername() {
  return sessionStorage.getItem(usernameKey)
}

export function getUserImg() {
  return sessionStorage.getItem(userImgKey)
}

export function getMenus() {
  return sessionStorage.getItem(menusKey)
}

export function setMenus(menus) {
  return sessionStorage.setItem(menusKey, JSON.stringify(menus))
}

export function setUserInfo(userImg, username) {
  sessionStorage.setItem(userImgKey, userImg)
  sessionStorage.setItem(usernameKey, username)
}

export function setToken(accessToken, refreshToken) {
  sessionStorage.setItem(accessTokenKey, accessToken)
  if (refreshToken !== null && refreshToken !== undefined) {
    sessionStorage.setItem(refreshTokenKey, refreshToken)
  }
}

export function removeToken() {
  sessionStorage.removeItem(accessTokenKey)
  sessionStorage.removeItem(refreshTokenKey)
}
