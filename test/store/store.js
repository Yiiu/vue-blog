import Vuex from 'vuex'
import Vue from "vue";
Vue.use(Vuex)
const state = {
    alertshow:false
}
const mutations  = {
    test (state, amount){
        state.alertshow = amount;
    }
}
export default new Vuex.Store({
    state,
    mutations
})