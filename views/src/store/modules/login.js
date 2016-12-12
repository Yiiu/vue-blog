import * as types from '../mutation-types'

const state = {
    userInfo : {},
    status : false
}
const mutations = {
    // 登录状态
    [types.CHECK_LOGIN](state, data){
        if(data.status == "success"){
            state.status = true
            state.userInfo = data.data
        }else {
            state.status = false
            state.userInfo = null
            return
        }
    }
}
export default {
    state,
    mutations
}