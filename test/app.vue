<template>
    <div class="main">
        <headers></headers>
        <div class="content">
        	<router-view transition-mode="out-in"></router-view>
        </div>
        <footers></footers>
        <alertsmall></alertsmall>
        <loading></loading>
    </div>
</template>
<style lang="less">
@import "./assets/styles/main";
.content {
    margin-top: 120px;
}
</style>
<script>
import loading from "./components/loading";
import alertsmall from "./components/alert-small";
import store from './store/store' ;
import { getAlertshow } from './store/getters' ;
import headers from "./components/header";
import footers from "./components/footer";
export default {
    vuex:{
        getters:{
            alertshow:state => state.alertshow
        }
    },
    components: {
        headers,
        footers,
        alertsmall,
        loading
    },
    store,
}
</script>
