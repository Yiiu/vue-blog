<template>
    <router-view v-if="loading"></router-view>
</template>
<script>
import { go } from '../store/actions';
export default {
    data(){
        return {
            loading:false
        }
    },
    init: function(){
        this.$http.post("/log",).then((response)=>{
            this.op = response.data.op;
            if(this.op != "true"){
                window.location.href = "#/login";
            }else {
                this.loading = true
            }
        })
    }
}
</script>