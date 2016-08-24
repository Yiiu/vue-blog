<template>
    <div  :class="{
            'admin-box':true,
            'admin-open': nav
        }">
        <div class="admin-container">
            <headers></headers>
            <div class="admin-content">
                <router-view transition-mode="out-in"></router-view>
            </div>
        </div>
        <navs></navs>
    </div>
</template>
<style lang="less">
div.admin-open {
    nav.admin {
        width: 120px !important;
    }
    div.admin-container {
        padding-left: 120px !important;
    }
}
div.admin-box {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    div.admin-container {
        transition: 0.3s padding;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding-left: 55px;
    }
    div.admin-content {
        padding-top: 70px;
        padding: 85px 15px 0 15px;
    }
}
</style>
    <headers></headers>
    <navs></navs>
    <router-view v-if="loading"></router-view>
</template>
<script>
import { go } from '../../store/actions';
import headers from "./header";
import navs from "./nav";
import { adminnav } from '../../store/actions';
export default {
    vuex:{
        actions: {
            adminnav
        },
        getters:{
            nav:state => state.adminnav
        }
    },
    data(){
        return {
            loading:false
        }
    },
    init: function(){
        this.$http.post("/log",).then((response)=>{
            this.op = response.data.op;
            console.log(response.data)
            if(this.op != "true"){
                window.location.href = "#/login";
            }else {
                this.loading = true
            }
        })
    },
    components:{
        headers,
        navs
    }
}
</script>
