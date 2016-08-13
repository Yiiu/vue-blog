<template>
    <headers></headers>
    <navs></navs>
    <router-view v-if="loading"></router-view>
</template>
<script>
import { go } from '../../store/actions';
import headers from "./header";
import navs from "./nav";
export default {
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
