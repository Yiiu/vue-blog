import * as types from '../mutation-types'

const state = {
    article:{},
    articles:[],
}

const mutations = {
    [types.DEL_ARTICLE](state,data){
        state.articles = data
    }
}
export default {
    state,
    mutations
}