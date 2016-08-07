<template>
    <div class="login col-4-c" transition="op" v-if="loading">
        {{alertshow}}
        <label>
            <input type="text" id="name" class="y block" placeholder="帐号：" autocomplete="new-password"  v-el:name>
        </label>
        <label>
            <input type="password" class="y block" placeholder="密码：" id="password" autocomplete="new-password"  
                v-el:password
                @keyup.enter="test"
            >
        </label>
        <button @click="test" class="btn btn-default block">on</button>
        <alertsmall 
            :show.sync="yes"
            :title="'登录成功。'"
        ></alertsmall>
        <alertsmall 
            :show.sync="no"
            :title="'登录失败，帐号或密码错误。'"
        ></alertsmall>
    </div>
</template>
<script>
import store from '../store/store' ;
import alertsmall from "../components/alert-small";
export default {
    vuex:{
        getters:{
            alertshow:state => state.alertshow
        }
    },
    data(){
        return {
            yes:false,
            no:false,
            loading:false,
        }
    },
    methods:{
        test:function(){
            this.$http.post("/login",{
                name:this.$els.name.value,
                password:this.$els.password.value
            }).then((response)=>{
                this.op = response.data.op;
                if(this.op == "true"){
                    this.yes = true
                    window.location.href = "#/admin";
                }else {
                    this.no = true
                }
            })
        }
    },
    init: function(){
        this.$http.post("/log",).then((response)=>{
            if(response.data.op == "true"){
                window.location.href = "#/admin";
            }else {
                this.loading = true;
            }
        })
    },
    components:{
        alertsmall
    }
}
</script>
<style lang="less">
.login {
    box-sizing: border-box;
    padding: 35px 45px;
    border: 1px solid #dcdcdc;
    border-radius: 3px;
}
</style>