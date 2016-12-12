import Vue from 'vue'
import Router from 'vue-router'

import store from '../store'

const login = resolve => require(['./view/login'], resolve)
const logon = resolve => require(['./view/logon'], resolve)
const logout = resolve => require(['./view/logout'], resolve)
const admin = resolve => require(['./view/admin'], resolve)
const admin_index = resolve => require(['./view/admin/index'], resolve)
const admin_article = resolve => require(['./view/admin/article'], resolve)
const admin_addarticle = resolve => require(['./view/admin/addArticle'], resolve)
const admin_type = resolve => require(['./view/admin/type'], resolve)
const admin_typearticle = resolve => require(['./view/admin/typeArticle'], resolve)
const admin_addtype = resolve => require(['./view/admin/addType'], resolve)
const admin_comment = resolve => require(['./view/admin/comment'], resolve)
const admin_setting = resolve => require(['./view/admin/setting'], resolve)

Vue.use(Router)

let router = new Router({
    mode: 'hash',
    scrollBehavior (to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            }
        }else {
            return { x: 0, y: 0 }
        }
    },
    routes: [
        {
            path: '/',
            component: admin,
            meta: { requiresAuth: true },
            children:[
                {
                    path: '',
                    component: admin_index
                },
                {
                    path: 'article',
                    component: admin_article
                },
                {
                    path: 'add/article',
                    component: admin_addarticle
                },
                {
                    path: 'up/article/:id',
                    component: admin_addarticle
                },
                {
                    path: 'type',
                    component: admin_type
                },
                {
                    path: 'type/:alias',
                    component: admin_typearticle
                },
                {
                    path: 'add/type',
                    component: admin_addtype
                },
                {
                    path: 'comment',
                    component: admin_comment
                },
                {
                    path: 'setting',
                    component: admin_setting
                }
            ]
        },
        {
            path:'/login',
            component:login,
            meta: { log: true },
        },
        {
            path:'/logon',
            component:logon,
            meta: { log: true },
        },
        {
            path:'/logout',
            component:logout,
        }
    ]
})

router.beforeEach((to, from, next) => {
    Vue.prototype.$loading.open()
    store.dispatch("checklogin")
    .then((login)=>{
        if (to.matched.some(record => record.meta.requiresAuth)) {
            if(login.status){
                Vue.prototype.$loading.success()
                next()
            }else {
                Vue.prototype.$loading.success()
                next("login")
            }
        }else if(to.matched.some(record => record.meta.log)) {
            Vue.prototype.$loading.open()
            if(login.status) {
                next("/")
            }else {
                next()
            }
            next()
        }else {
            next()
        }
    })
})

router.afterEach(route => {
    Vue.prototype.$loading.success()
})

export default router
