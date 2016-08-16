<template>
    <div class="col-6-c article" v-if="loading" transition="op">
        <article>
            <h1 class="title">{{data.title}}</h1>
            <p class="center">
                <span><i class="iconfont">&#xe604;</i>{{data.author}}</span>
                <span><i class="iconfont">&#xe600;</i>{{data.time}}</span>
                <span><i class="iconfont">&#xe602;</i>{{data.vistits}}</span>
            </p>
            <p style="display: none;">
                <span><i class="iconfont">&#xe609;</i>{{data.type}}</span>
                <span><i class="iconfont">&#xe60a;</i>{{data.tags}}</span>
            </p>
            <div class="container" v-html="data.content">
            </div>
        </article>
        <h2 class="end">&lt;end/&gt;</h2>
    </div>
</template>
<script>
import comment from "../components/comment"
function GetScroll() {
  var x, y;
  if(window.pageYOffset) {
    // all except IE
    y = window.pageYOffset;
    x = window.pageXOffset;
  } else if(document.documentElement
    && document.documentElement.scrollTop) {
    // IE 6 Strict
    y = document.documentElement.scrollTop;
    x = document.documentElement.scrollLeft;
  } else if(document.body) {
    // all other IE
    y = document.body.scrollTop;
    x = document.body.scrollLeft;
  }
  return y
}
export default {
    data(){
        return {
            loading:false,
            data:{},
            ds:true
        }
    },
    methods:{
        duoshuo:function(t,e){
            var el = document.createElement('div');//该div不需要设置class="ds-thread"
            var ar = document.getElementsByClassName("article")[0];
            el.id = "ds-wrapper;";
            el.setAttribute('data-thread-key', this.data._id);//必选参数
            el.setAttribute('data-url', window.location.href);//必选参数
            el.setAttribute('data-author-key', '作者的本地用户ID');//可选参数
            DUOSHUO.EmbedThread(el);
            ar.appendChild(el);
            this.ds = false;
        }
    },
    init: function(){
        let ids = this.$route.matched[0].params.id;
        this.$http.post("/article",{
            id:ids
        }).then((response)=>{
            this.data = response.data;
            this.loading = true;
        })
        var num = null;
        var scroll = setInterval(function(){
            var y = GetScroll();
            if(y == 0 ){
                clearInterval(scroll);
            }else {
                window.scrollTo(0,y-20);
            }
        },5)
    },
    ready:function(){
        let that = this;
        setTimeout(function(){
            that.duoshuo()
            console.log(that)
        },1000)
    },
    components:{
        comment
    }
}
</script>
<style lang="less">
@import "../assets/styles/_var";
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
              position: relative;
              background: #f3f3f3;
              margin: 0;
              padding: 5px 0 5px 30px;
              border-radius: 5px;
              color: #686868;
              &:before {
                position: absolute;
                width: 4px;
                height: 100%;
                left:5px;
                top: 0;
              }
            }
        }
    }
}
</style>
