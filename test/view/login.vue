<template>
    <div class="login col-4-c" transition="op" v-if="loading">
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
    </div>
</template>
<script>
import { alertshow, alerttitle, alertstyle } from '../store/actions';
export default {
    vuex:{
        actions: {
          alertshow,
          alerttitle,
          alertstyle
        }
    },
    data(){
        return {
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
                    this.alertshow(true)
                    this.alerttitle("登陆成功")
                    window.location.href = "#/admin";
                }else {
                    this.alertshow(true)
                    this.alertstyle("warn")
                    this.alerttitle("登录失败！！")
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