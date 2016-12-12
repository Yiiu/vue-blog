<template>
    <article class="main" v-if="loading">
        <articles :data="data"></articles>
        <div class="tag container p-12" v-if="data.tags>0">
            <span class="tag-list" v-for="tag in data.tags">{{tag.name}}</span>
        </div>
        <p v-else class="container p-12 tag">未添加tag</p>
        <div class="posts-end container">
            <span></span>
        </div>
        <div class="comment-box container p-12" id="comment" v-if="comment">
            <comment :data="comments" @get-comment="getComment"></comment>
        </div>
    </article>
</template>
<script>
import {detectOS} from "../../../uilt";
import comment from "../../../components/comment/comment"
import articles from "../../../components/article"
export default {
    data(){
        return {
            data:{},
            loading:false,
            htmls:{},
            mask:false,
            comments:[], 
            comment:false,
        }
    },
    created(){
        let title = document.title
        this.$store.dispatch("getArticle", this.$route.params.id)
        .then(article=>{
            document.title = `${this.$config.title} - ${article.title}`
            this.loading = true
            this.data = article
            this.getComment()
        })
        .catch(e=>{
            this.$router.push("/404")
        })
    },
    methods:{
        getComment(){
            this.$store.dispatch("getOneComment", this.$route.params.id)
            .then(comment=>{
                this.comments = comment
                this.comment = true
            })
        },
        addComment(){
            this.$http.post("/api/comment", {
                article:this.$route.params.id,
                content:this.comment,
                os:detectOS()
            }).then(response=>{
                console.log(response)
            })
        }
    },
    components:{
        comment,
        articles
    }
}
</script>
<style lang="less">
@import "../../../styles/code.css";
</style>