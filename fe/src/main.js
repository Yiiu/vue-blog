import Vue from "vue"
import App from "./App"
import map from "./router";
import Router from "vue-router"
import VueResource from "vue-resource"
import globalCo from "./components/global"


Vue.config.devtools = true;

Vue.use(VueResource)
Vue.use( Router );

Vue.use(globalCo, {
	Modal:true
})
var router = new Router({hashbang: false,history:true});
/* eslint-disable no-new */

map(router);
router.start(App, "#app")