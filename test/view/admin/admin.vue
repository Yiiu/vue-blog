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
@import "../../assets/styles/_var";
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
        padding-left: @ad-nav-h;
    }
    div.admin-content {
        padding-top: 70px;
        padding: 85px 15px 0 15px;
    }
}
</style>
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
    ready: function(){
        this.$http.post("/checklogin",).then((response)=>{
            if(response.data.status == "fail"){
                window.location.href = "#/login";
            }else {
                console.log(response)
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
