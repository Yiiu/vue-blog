<template>
    <div class="container p-12">
        <div class="login">
            <h2 class="index-title"><i class="ion-locked"></i></h2>
            <h2 class="index-title">登陆</h2>
            <label>
                <p>账号：</p>
                <input type="text" v-model="name" @keyup.enter="login">
            </label>
            <label>
                <p>密码：</p>
                <input type="password" v-model="password" @keyup.enter="login">
            </label>
            <y-button type="ghost" @click.native="login">登陆</y-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            name:"",
            password:""
        }
    },
    methods:{
        login(){
            if(this.name == ""){
                this.$notify.warning("用户名不能为空~")
                return
            }
            if(this.password == ""){
                this.$notify.warning("密码不能为空~")
                return
            }
            this.$store.dispatch("login",{
                name:this.name,
                password: this.password
            })
            .then(data=>{
                this.$notify("登陆成功~")
                this.$router.push("/")
            })
            .catch(err=>{
                this.$notify.warning("登陆失败,账号或密码错误~")
            })
        }
    }
}
</script>
<style lang="less">
.login {
    width: 320px;
    margin: 0 auto;
    h2.index-title {
        text-align: center;
        font-size: 28px;
    }
    .y-btn {
        font-size: 16px;
        margin-top: 12px;
        display: block;
        width: 100%;
        line-height: 1.6;
    }
}
</style>