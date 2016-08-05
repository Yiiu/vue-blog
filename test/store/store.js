import Vuex from 'vuex'
import Vue from "vue";
Vue.use(Vuex)
const state = {
    cout:false
}
const mutations  = {
    test (state, amount){
        state.cout = amount;
    }
}
export default new Vuex.Store({
    state,
    mutations
})