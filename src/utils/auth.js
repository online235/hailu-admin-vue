const accessTokenKey = 'accessToken'
const refreshTokenKey = 'refreshToken'
const usernameKey = 'username'
const userImgKey = 'userImg'

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

export function setUserInfo(userImg, username) {
  localStorage.setItem(userImgKey, userImg)
  localStorage.setItem(usernameKey, username)
}

export function setToken(accessToken, refreshToken) {
  localStorage.setItem(accessTokenKey, accessToken)
  if (refreshToken !== null) {
    localStorage.setItem(refreshTokenKey, refreshToken)
  }
}

export function removeToken() {
  localStorage.removeItem(accessTokenKey)
  localStorage.removeItem(refreshTokenKey)
}
