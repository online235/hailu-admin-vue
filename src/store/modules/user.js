import { api_login, api_logout } from '@/api/login'
import {
  getAccessToken,
  getRefreshToken,
  getUserImg,
  getUsername,
  removeToken,
  setToken,
  setUserInfo
} from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getAccessToken(),
  name: getUsername(),
  avatar: getUserImg()
}

const mutations = {
  SET_TOKEN: (state, accessToken) => {
    state.token = accessToken
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      api_login({ account: username.trim(), pwd: password }).then(response => {
        const { data } = response
        const userImg = data.avatar == null ? '@/assets/default_avatar.png' : ''
        commit('SET_TOKEN', data.accessToken)
        commit('SET_NAME', data.nickName)
        commit('SET_AVATAR', userImg)
        setUserInfo(userImg, data.nickName)
        setToken(data.accessToken, data.refreshToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      const refreshToken = getRefreshToken()
      if (refreshToken == null) {
        return
      }
      api_logout(refreshToken).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

