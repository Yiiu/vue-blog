import Vuex from 'vuex'
import Vue from "vue";
Vue.use(Vuex)
const state = {
    alertshow:false,
    alerttitle:"",
    alertstyle:"",
    alerttime:1000,
}
const mutations  = {
    ALERTSHOW (state, amount){
        state.alertshow = amount;
    },
    ALERTTITLE (state, amount){
        state.alerttitle = amount;
    },
    ALERTSTYLE (state, amount){
        state.alertstyle = amount;
    },
    ALERTTIME (state, amount){
        state.alerttime = amount;
    }
}
export default new Vuex.Store({
    state,
    mutations
})