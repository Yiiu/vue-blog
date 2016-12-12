<template>
    <div class="container p-12">
        <div class="login">
            <h2 class="index-title"><i class="ion-locked"></i></h2>
            <h2 class="index-title">注册</h2>
            <label>
                <p><span class="red">*</span> 邮箱：
                    <y-tooltips content="请输入正确的邮箱" trigger="hover">
                        <span class="point" slot="html">提示</span>
                    </y-tooltips>
                </p>
                <input type="text" v-model="email">
            </label>
            <label>
                <p><span class="red">*</span> 账号：
                    <y-tooltips content="这是登陆id" trigger="hover">
                        <span class="point" slot="html">提示</span>
                    </y-tooltips>
                </p>
                <input type="text" v-model="name">
            </label>
            <label>
                <p><span class="red">*</span> 密码：
                    <y-tooltips content="password >= 6 && password <= 16" trigger="hover">
                        <span class="point" slot="html">提示</span>
                    </y-tooltips>
                </p>
                <input type="password" v-model="password">
            </label>
            <y-button type="ghost" @click.native="logon">注册</y-button>
        </div>
    </div>
</template>
<script>
import {isEmail} from "../../uilt"
export default {
    data(){
        return {
            email:"",
            name:"",
            password:""
        }
    },
    methods:{
        logon(){
            if(this.email == "") {
                this.$notify.warning("邮箱地址不能为空")
                return
            }else {
                if(!isEmail(this.email)) {
                    this.$notify.warning("请输入正确的邮箱地址")
                    return
                }
            }
            if(this.name == "") {
                this.$notify.warning("名字不能为空")
                return
            }
            if(this.password == "") {
                this.$notify.warning("密码不能为空")
                return
            }else {
                if(!this.password.length >6 && !this.password.length<16) {
                    this.$notify.warning("密码不能少于6位大于16位")
                }
            }
            this.$store.dispatch("logon",{
                name:this.name,
                email:this.email,
                password: this.password
            })
            .then(data=>{
                this.$notify("注册成功~")
                this.$router.push("/login")
            })
            .catch(err=>{
                this.$notify.warning(err)
            })
        }
    }
}
</script>
<style lang="less">
.login {
    width: 320px;
    margin: 0 auto;
    span.red {
        color: #ff7473;
    }
    h2.index-title {
        text-align: center;
        font-size: 28px;
    }
    label {
        p {
            margin: 8px 0;
            span.point {
                display: inline-block;
                font-size: 12px;
                border: 1px #ccc solid;
                padding: 2px 6px;
                border-radius: 4px;
            }
        }
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