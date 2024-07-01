import { login, getInfo } from '@/api/user'

const getDefaultState = () => {
  return {
    user: null, // 用户登录信息
  }
}

const state = getDefaultState()

const mutations = {
  resetState(state) {
    Object.assign(state, getDefaultState())
  },
  setUser(state, payload) {
    state.user = payload;
  }
}

const actions = {
  /**
   * 用户登录
   * @param {*} ctx 仓库实例
   * @param {*} userInfo 用户提交的数据
   * @returns 
   */
  async login(ctx, userInfo) {
    let resp = await login(userInfo);
    if (typeof resp === 'string') {
      resp = JSON.parse(resp);
      resp.msg = "验证码错误";
      return resp;
    }
    if (!resp.data) {
      resp.msg = "账号密码错误";
    }
    ctx.commit('setUser', resp.data);
    return resp;
  },

  // 恢复登录（whoami）
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(resp => {
        if (typeof resp === 'string') {
          // 说明 token 已经失效
          resp = JSON.parse(resp);
          if (resp.code === 401) {
            reject(resp.msg);
          }
        } else {
          // 说明 token 是有效的，存储用户信息
          commit('setUser', resp.data);
          resolve(resp.data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 移除 token
  resetToken({ commit }) {
    return new Promise(resolve => {
      localStorage.removeItem('adminToken');
      commit('resetState');
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

