const accessTokenKey = 'accessToken'
const refreshTokenKey = 'refreshToken'
const usernameKey = 'username'
const userImgKey = 'userImg'
const menusKey = 'menus'

export function getAccessToken() {
  return localStorage.getItem(accessTokenKey)
}

export function getRefreshToken() {
  return localStorage.getItem(refreshTokenKey)
}

export function getUsername() {
  return localStorage.getItem(usernameKey)
}

export function getUserImg() {
  return localStorage.getItem(userImgKey)
}

export function getMenus() {
  return localStorage.getItem(menusKey)
}

export function setMenus(menus) {
  return localStorage.setItem(menusKey, JSON.stringify(menus))
}

export function setUserInfo(userImg, username) {
  localStorage.setItem(userImgKey, userImg)
  localStorage.setItem(usernameKey, username)
}

export function setToken(accessToken, refreshToken) {
  localStorage.setItem(accessTokenKey, accessToken)
  if (refreshToken !== null && refreshToken !== undefined) {
    localStorage.setItem(refreshTokenKey, refreshToken)
  }
}

export function removeToken() {
  localStorage.removeItem(accessTokenKey)
  localStorage.removeItem(refreshTokenKey)
}
