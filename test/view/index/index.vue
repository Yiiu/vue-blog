<template>
    <div class="col-5-c index animated" v-if="loading" transition="op">
        <div v-if="loading">
            <article v-for="article in data">
                <h1 class="center"><a v-link="{ name:'article',params : {id : article._id}}">{{article.title}}</a></h1>
                <p  class="center">
                    <span><i class="icon-head"></i>{{ article.author }}</span>
                    <span><i class="icon-clock"></i>{{ article.update_time[0] }}</span>
                    <span><i class="icon-eye"></i>{{ article.vistits }}</span>
                </p>
                <img v-if="article.indexImg" :src="article.indexImg" alt="">
                <span v-html="article.content"></span>
                <div class="more"><a v-link="{ name:'article',params : {id : article._id}}" class="btn btn-blue btn-big">-阅读全文-</a></div>
            </article>
            <p class="nonono" v-if="nulls">啊噢，没有文章啦。。</p>
            <p style="text-align: center;margin: 40px 0;">
                <a class="btn btn-blue btn-big btn-no" @click="next"  v-if="!nulls">
                    --加。。载--
                </a>
            </p>
        </div>
    </div>
</template>
<style lang="less">
@import "../../assets/styles/_var";
div.index{
    article {
        margin-top: 46px;
        &:first-child{
            margin-top: 0;
        }
        &:after {
            content: "";
            display: block;
            width: 20%;
            height: 1px;
            background: #ccc;
            margin-left: 40%;
            margin-top: 15px;
        }
        >img {
            width: 100%;
            border-radius: 15px;
            margin-bottom: 10px;
        }
        >p {
            >span {
                margin: 0 2px;
                color: @6;
            }
        }
        >span {
            color:@pColor;
        }
        >.more {
            margin: 25px 0;
            text-align: center;
        }
    }
}
.nonono {
    font-size: 42px;
    text-align: center;
}
</style>
<script>
import { loadingin } from '../../store/actions';
export default {
    vuex:{
        actions:{
            loadingin:loadingin
        }
    },
    data(){
        return{
            data:{},
            status:null,
            msg:null,
            nulls:false,
            page: 0,
            querys:"",
            alertsmall:false,
            alert:false,
            loading:false,
        }
    },
    methods:{
        next:function(){
            var that =this;
            this.page++;
            this.$http.post("/index",{
                t:this.page
            }).then((response)=>{
                response.data.forEach(function(item){
                    that.data.push(item);
                })
                if(response.data == ""){
                    this.nulls = true;
                }
            })
        },
        onquery:function(){
            this.$http.post("/querys",{
                title:"title",
                cc:this.querys
            }).then((response)=>{
            })
        },
        test: function(){
            this.alertsmall = true;
        }
    },
    ready: function(){
        this.loadingin(true)
        this.$http.post("/index",{
            t:0
        }).then((response)=>{
            this.data = response.data.data;
            this.status = response.data.status;
            this.msg = response.data.msg;
            this.loading = true;
            this.loadingin(false)
            if(this.data == ""){
                this.nulls = true
            }
        })
    },
    components:{
        alert,
    },
    beforeDestroy:function(){
        this.loadingin(true)
    }
}
</script>
