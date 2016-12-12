<template>
    <div id="app">
        <headers></headers>
        <div id="main">
            <transition name="index" appear mode="out-in" @after-leave="sc" @after-enter="trues" @before-leave="falses">
                <router-view></router-view>
            </transition>
        </div>
        <footers v-show="footer"></footers>
    </div>
</template>
<script>

import headers from "../components/header-index"
import footers from "../components/footer-index"
export default {
    data(){
        return {
            footer:false
        }
    },
    components:{
        headers,
        footers
    },
    methods:{
        sc(){
            this.falses
            window.scroll(0,0)
        },
        falses(){
            this.footer = false
        },
        trues(){
            this.footer = true
        }
    }
}
</script>
<style lang="less">
@import "../styles/index";
#app {
    height: 100%;
}
#main {
    min-height: 100%;
}
.main  {
    margin-top: 60px;
}
</style>