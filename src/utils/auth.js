const accessTokenKey = 'adminAccessToken'
const refreshTokenKey = 'adminRefreshToken'
const usernameKey = 'adminUsername'
const accountTypeKey = 'accountType'
const userImgKey = 'adminUserImg'
const menusKey = 'adminMenus'
const cityCodeKey = 'cityCode'

export function getAccessToken() {
  return sessionStorage.getItem(accessTokenKey)
}

export function getRefreshToken() {
  return sessionStorage.getItem(refreshTokenKey)
}

export function getUsername() {
  return sessionStorage.getItem(usernameKey)
}

export function getAccountType() {
  return sessionStorage.getItem(accountTypeKey)
}

export function getUserImg() {
  return sessionStorage.getItem(userImgKey)
}

export function getCityCode() {
  return sessionStorage.getItem(cityCodeKey)
}

export function getMenus() {
  return sessionStorage.getItem(menusKey)
}

export function setMenus(menus) {
  return sessionStorage.setItem(menusKey, JSON.stringify(menus))
}

export function setUserInfo(userImg, username, accountType, cityCode) {
  sessionStorage.setItem(userImgKey, userImg)
  sessionStorage.setItem(usernameKey, username)
  sessionStorage.setItem(accountTypeKey, accountType)
  if (cityCode != null) {
    sessionStorage.setItem(cityCodeKey, cityCode)
  }
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
  sessionStorage.removeItem(accountTypeKey)
  sessionStorage.removeItem(cityCodeKey)
  sessionStorage.removeItem(usernameKey)
  sessionStorage.removeItem(userImgKey)
  sessionStorage.removeItem(menusKey)
}
