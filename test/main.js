import Vue from "vue";
import Router from "vue-router";
import App from "./app";
import Resource from "vue-resource";


import map from "./router";

Vue.config.devtools = true;


Vue.use( Router );
Vue.use( Resource );
var router = new Router({hashbang: false});


Vue.directive('on').keyCodes.dou = 188;



map(router);
router.start(App, ".app")
