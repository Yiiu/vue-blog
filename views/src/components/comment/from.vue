<template>
    <div class="comment-form">
        <div class="comment-form-user" v-if="!$store.state.login.status">
            <div class="comment-input">
                <div 
                    contenteditable="true" 
                    class="text"
                    @input="test" 
                    @focus="textOpen"
                    ref="text"  
                    :class="{open:valueBtn}"
                    id="comment-text"
                >
                </div>
            </div>
            <div class="comment-users" v-if="open">
                <input type="text" placeholder="邮箱 *" v-model="user.email">
                <input type="text" placeholder="昵称 *" v-model="user.name">
                <input type="text" placeholder="主页" v-model="user.www">
            </div>
        </div>
        <div class="comment-form-admin" v-else>
            <div class="comment-form-avater">
                <img :src="`https://cdn.v2ex.com/gravatar/${$store.state.login.userInfo.emailmd5}?s=50`">
            </div>
            <div class="comment-input">
                <div 
                    contenteditable="true" 
                    class="text"
                    @input="test"
                    ref="text"  
                    :class="{open:valueBtn}"
                    id="comment-text"
                    @focus="textOpen"
                >
                </div>
            </div>
        </div>
        <div class="comment-btn" v-if="open">
            <a @click="addComment">评论</a>
            <a @click="textOut" type="ghost">取消</a>
        </div>
    </div>
</template>
<script>
import {detectOS, In, isEmail} from "../../uilt"
export default {
    props:{
        reply:String
    },
    data(){
        return {
            comment:"",
            open:false,
            textHeight:38,
            valueBtn:true,
            user:{
                name:"",
                email:"",
                www:"",
            }
        }
    },
    methods:{
        addComment(){
            if(!this.$store.state.login.status){
                if(this.user.name == ""){
                    this.$notify.warning("用户名不能为空~")
                    return
                }
                if(this.user.email == ""){
                    this.$notify.warning("邮箱不能为空~")
                    if(!isEmail(this.user.email)){
                        this.$notify.warning("邮箱格式不正确~")
                        return
                    }
                }
            }
            if(this.$refs.text.innerText == ""){
                this.$notify.warning("内容不能为空~")
                return
            }
            this.$store.dispatch("addComment", {
                id:this.$route.params.id,
                content:this.$refs.text.innerText,
                os:detectOS(),
                user:this.user,
                reply:this.reply
            }).then(response=>{
                this.$notify("评论成功~")
                this.$parent.getComment()
            }).catch(err=>{
                this.$notify.warning(err)
            })
        },
        test(){
            if(this.$refs.text.innerText){
                this.valueBtn = false
            }else {
                this.valueBtn = true
            }
        },
        textOpen(){
            this.open = true
        },
        textOut(){
            this.$refs.text.innerText = ""
            this.valueBtn = true
            this.open = false
        },
    }
}
</script>
<style lang="less">
div.comment-form{
    margin-bottom: 62px;
    .comment-input {
        width: 100%;
        max-width: 100%;
        .text {
            position: relative;
            width: 100%;
            max-width: 100%;
            border: none;
            outline: none;width: 100%;
            font-size: 24px;
            outline: none;
            border: none;
            min-height: 38px;
            max-height: 6em;
            word-wrap: break-word;
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-user-modify: read-write-plaintext-only;
            &.open:after{
                content: "点击评论";
                color: #9b9b9b;
                cursor: text;
            }
        }
    }
    .comment-users {
        input {
            display: block;
            width: 100%;
            border: none;
            outline: none;
            font-size: 18px;
            line-height: 1.8;
            color: #9b9b9b;
        }
    }
    .comment-form-admin {
        display: flex;
        align-items: center;
        min-height: 55px;
        margin-bottom: 12px;
        .comment-form-avater {
            position: absolute;
            border-radius: 100%;
            overflow: hidden;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .comment-input {
            padding-left: 67px;
        }
    }
    .comment-btn {
        a {
            cursor:pointer;
            margin-right: 12px;
        }
    }
}

</style>