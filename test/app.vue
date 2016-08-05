<template>
    <div class="main">
        <headers></headers>
        <div class="content">
        	<router-view></router-view>
        </div>
        <footers></footers>
    </div>
</template>
<style>
.content {
    margin-top: 120px;
}
</style>
<script>
import store from './store/store' ;
import headers from "./components/header";
import footers from "./components/footer";
export default {
    components: {
        headers,
        footers
    },
    store
}
</script>