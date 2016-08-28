<template>
    <div class="login col-4-c" transition="op" transition-mode="out-in" v-if="loading">
        <label>
            <input type="text" id="name" class="y block" placeholder="帐号：" autocomplete="new-password"
                v-model="name"
            >
        </label>
        <label>
            <input type="password" class="y block" placeholder="密码：" id="password" autocomplete="new-password"  
                v-model="password"
                @keyup.enter="login"
            >
        </label>
        <button @click="login" class="btn btn-default block">on</button>
    </div>
</template>
<script>
import { alertshow, alerttitle, alertstyle, loadingin } from '../store/actions';
export default {
    vuex:{
        actions: {
          alertshow,
          alerttitle,
          alertstyle,
          loadingin
        }
    },
    data(){
        return {
            name:"",
            password:"",
            loading:false,
            status:"",
            msg:"",
        }
    },
    methods:{
        login:function(){
            if(this.name == ""){
                this.alertshow(true)
                this.alertstyle("warn")
                this.alerttitle("账号不能为空")
                return false
            }else if(this.password == "") {
                this.alertshow(true)
                this.alertstyle("warn")
                this.alerttitle("密码不能为空")
                return false
            }
            this.$http.post("/login",{
                name:this.name,
                password:this.password
            }).then((response)=>{
                this.status = response.data.status;
                this.msg = response.data.msg;
                if(this.status == "success"){
                    this.alertshow(true)
                    this.alerttitle("登陆成功")
                    window.location.href = "#/admin";
                }else {
                    this.alertshow(true)
                    this.alertstyle("warn")
                    this.alerttitle(this.msg)
                }
            })
        }
    },
    ready: function(){
        this.loadingin(true)
        this.$http.post("/checklogin",).then((response)=>{
            if(response.data.status == "success"){
                window.location.href = "#/admin";
            }else {
                this.loading = true;
                this.loadingin(false)
            }
        })
    },
    beforeDestroy:function(){
        this.loadingin(true)
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