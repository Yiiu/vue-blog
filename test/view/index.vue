<template>
    <div class="col-5-c index animated" v-if="loading" transition="op">
        <article v-for="article in datas">
            <h2><a v-link="{ name:'article',params : {id : article._id}}">{{article.title}}</a></h2>
            <p>
                <span><i class="iconfont">&#xe604;</i>{{ article.author }}</span>
                <span><i class="iconfont">&#xe600;</i>{{ article.time[0] }}</span>
                <span><i class="iconfont">&#xe602;</i>{{ article.vistits }}</span>
            </p>
            <img :src="article.indexImg" alt="">
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
</template>
<style lang="less">
div.index{ 
    article {
        margin-top: 46px;
        &:first-child{
            margin-top: 0;
        }
        >h2 {
            font-size: 38px;
            text-align: center;
            margin-bottom: 0px;
            margin-top: 0px;
            a {
                transition: all 0.3s ;
                color: #4f6a85;
                line-height: 64px;
                &:hover {
                    color: #6e8eae;
                }
            }
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
        }
        >p {
            margin-top: 5px;
            text-align: center;
            >span {
                margin: 0 2px;
                color: #95a5a6;
            }
        }
        >span {
            color:#6e8eae;
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
@media screen and (max-width:768px) {
    div.index {
        article {
            >h2 {
                font-size: 24px;
                a{
                    line-height: 32px;
                }
            }
        }
    }
}
</style>
<script>
export default {
    data(){
        return{
            datas:{},
            loading:false,
            nulls:false,
            page: 0,
            querys:""
        }
    },
    methods:{
        next:function(){
            var that =this;
            this.page++;
            console.log(this.page)
            this.$http.post("/index",{
                t:this.page
            }).then((response)=>{
                response.data.forEach(function(item){
                    that.datas.push(item);
                })
                this.loading = true;
                if(response.data == ""){
                    this.nulls = true
                }
            })
        },
        onquery:function(){
            console.log(1)
            this.$http.post("/querys",{
                title:"title",
                cc:this.querys
            }).then((response)=>{
                console.log(response.data)
            })
        }
    },
    init: function(){
        this.$http.post("/index",{
            t:0
        }).then((response)=>{
            this.datas = response.data;
            this.loading = true;
            if(response.data == ""){
                this.nulls = true
            }
        })
    }
}
</script>