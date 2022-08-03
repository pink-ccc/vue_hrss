import { reqLogin } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'

const state = () => {
  return {
    // 一进来优先从缓存中提取token
    token: getToken()

  }
}
const mutations = {
  setToken(state, payload) {
    state.token = payload
    // 设置了token的同时，同步到本地cookies中
    setToken(payload)
  }
}

const actions = {
  async login(context, data) {
    const res = await reqLogin(data)
    context.commit('setToken', res.data)
  }
}

export default {
  // 开启命名空间
  namespaced: true,
  state,
  actions,
  mutations
}
