<template>
    <div class="col-6-c article" v-if="loading" transition="op">
        <article>
            <h1 class="title">{{data.title}}</h1>
            <p class="center">
                <span><i class="icon-head"></i>{{data.author}}</span>
                <span><i class="icon-clock"></i>{{data.update_time[0]}}</span>
                <span><i class="icon-eye"></i>{{data.vistits}}</span>
            </p>
            <p style="display: none;">
                <span><i class="iconfont">&#xe609;</i>{{data.type}}</span>
                <span><i class="iconfont">&#xe60a;</i>{{data.tags}}</span>
            </p>
            <div class="container" v-html="data.content">
            </div>
        </article>
        <comment></comment>
        <h2 class="end">&lt;end/&gt;</h2>
    </div>
</template>
<script>
import comment from "./comment";
import { loadingin } from '../../store/actions';
export default {
    vuex:{
        actions:{
            loadingin:loadingin
        }
    },
    data(){
        return {
            data:{},
            loading:false,
        }
    },
    ready:function(){
        this.loadingin(true)
        let ids = this.$route.matched[0].params.id;
        this.$http.post("/article",{
            id:ids
        }).then((response)=>{
            this.data = response.data.data;
            this.status = response.data.status;
            this.msg = response.data.msg;
            this.loading = true;
            this.loadingin(false)
        })
        var num = null;
        window.scrollTo(0, 0);
    },
    components:{
        comment
    },
    beforeDestroy:function(){
        this.loadingin(true)
    }
}
</script>
<style lang="less">
@import "../../assets/styles/_var";
.content{
    overflow-wrap: break-word;
}
.article {
    article {
        margin-bottom: 15px;
        &:after {
            content: "";
            display: block;
            width: 20%;
            height: 1px;
            background: #ccc;
            margin-left: 40%;
            margin-top: 15px;
        }
        >h1 {
            text-align: center;
            font-size: @h1Size;
        }
        >p {
            margin-bottom: 48px;
            >span {
                margin: 0 2px;
                color: @fuOne;
            }
        }
        >.container {
            h1 {
                font-size:@h2Size;
            }
            h2 {
                font-size:@h3Size;
            }
            h3 {
                font-size:@h4Size + 2;
            }
            h4 {
                font-size:@pSize + 2;
            }
            p {
                font-size: @pSize;
            }
            hr {
                background-color: #e8e8e8;
                height: 1px;
                border: none;
            }
            a {
                color: #59b6f4;
                &:hover {
                    color: darken(#59b6f4,10%);
                }
            }
            img {
                width: 100%;
                border-radius: 15px;
            }
            blockquote {
                background: #f3f3f3;
                margin: 0;
                padding: 5px 0 5px 30px;
                border-radius: 5px;
                color: #686868;
            }
        }
    }
}
</style>
