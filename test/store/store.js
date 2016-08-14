import Vuex from 'vuex'
import Vue from "vue";
Vue.use(Vuex)
const state = {
    alertshow:false,
    alerttitle:"",
    alertstyle:"",
    alerttime:1000,
    adminnav:false,
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
    },
    // admin
    ADMINNAV (state, amount) {
        if(state.adminnav){
            state.adminnav = false;
        }else {
            state.adminnav = true;
        }
    }
}
export default new Vuex.Store({
    state,
    mutations
})
