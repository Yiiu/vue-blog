import * as types from '../mutation-types'

const state = {
    article:{},
    articles:[],
    types:[],
}

const mutations = {
    [types.GET_INDEX](state,data){
        state.articles = data
    },
    [types.GET_TYPE](state,data){
        state.types = data
    }
}
export default {
    state,
    mutations
}