<template>
    <div class="main">
        <headers></headers>
        ddd{{ go }}
        <div class="content">
        	<router-view></router-view>
        </div>
        <footers></footers>
        <alertsmall 
        ></alertsmall>
    </div>
</template>
<style>
.content {
    margin-top: 120px;
}
</style>
<script>
import alertsmall from "./components/alert-small";
import store from './store/store' ;
import { getAlertshow } from './store/getters' ;
import headers from "./components/header";
import footers from "./components/footer";
export default {
    vuex:{
        getters:{
            go:getAlertshow
        }
    },
    components: {
        headers,
        footers,
        alertsmall
    },
    store
}
</script>