<template>
    <div class="comment">
        <div class="comment-reply" v-if="replyBtn">
            <div class="comment-item">
                <div class="comment-avater">
                    <img :src="`https://cdn.v2ex.com/gravatar/${reply.from.admin.emailmd5}?s=50`" v-if="reply.from.admin">
                    <img :src="`https://cdn.v2ex.com/gravatar/${reply.from.user.email}?s=50`" v-else>
                </div>
                <div class="comment-box">
                    <div class="content">
                        <p class="comment-info">
                            <span v-if="reply.from.admin" class="comment-name">{{reply.from.admin.name}}</span>
                            <span v-else class="comment-name">{{reply.from.user.name}}</span>
                            <span class="comment-xz">  </span>
                            <span class="comment-os comment-tag">{{ reply.os }} </span>
                        </p>
                        <div class="comment-content">
                            {{reply.content}}
                        </div>
                        <div class="comment-footer">
                            <span class="comment-time comment-tag">{{ reply.create_time[1] }} </span>
                        </div>
                        <div class="top" @click="replyBtn = false;reply = {};">取消</div>
                    </div>
                </div>
            </div>
        </div>
        <comment-from :reply="reply._id"></comment-from>
        <comment-item 
            v-for="(comment, index) in data" 
            :data="comment" 
            @commentBtn="commentBtn"
            @commentMore="commentMore"
            :index="index"
        ></comment-item>
        <p v-if="data.length == 0" class="text">还没有评论~快来评论吧</p>
        <y-dialog 
            v-model="childDialog"
        >
            <template slot="content" v-if="commentChild.status == 'success'">
                <comment-item 
                    v-for="(comment, index) in commentChild.data"
                    :data="comment" 
                    @commentBtn="commentBtn"
                    @commentMore="commentMore"
                    :index="index"
                    more
                    cm
                ></comment-item>
            </template>
        </y-dialog>
    </div>
</template>
<style lang="less">
.comment {
    padding-top: 22px;
    .comment-reply {
        .comment-item {
            padding-bottom: 6px;
            .comment-box {
                .content {
                    position: relative;
                    padding: 12px;
                    background: rgba(0,0,0,.04);
                    .top {
                        cursor: pointer;
                        position: absolute;
                        right: 12px;
                        top: 12px;
                    }
                }
            }
        }
    }
}
</style>
<script>
import {detectOS} from "../../uilt";
import commentFrom from "./from"
import commentItem from "./comment-item"
export default {
    props:{
        data:Array,
    },
    data(){
        return {
            reply:{},
            replyBtn:false,
            childDialog:false,
            show:false,
            loading:false,
            commentChild:{}
        }
    },
    components:{
        commentFrom,
        commentItem
    },
    methods:{
        commentBtn(id) {
            document.getElementById("comment-text").focus()
            let comments = this.data.filter((comment)=>{
                if(comment._id == id){
                    return comment
                }
            })
            this.reply = comments[0]
            this.replyBtn = true
        },
        commentMore(id) {
            this.childDialog = true
            this.$http.get(`/api/comment/child/${id}`)
            .then(e=>{
                this.commentChild = e.data
            })
        },
        getComment(){
            this.$emit("get-comment")
        }
    },
    mounted(){
        this.$nextTick(function(){
            this.loading = true
        })
    }
}
</script>