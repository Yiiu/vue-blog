<template>
    <header　v-if="$route.matched[0].handler.name !='admin'" class="index">
        <nav>
            <div class="title"><i class="iconfont" @click="navs">&#xe607;</i></div>
            <ul v-show="nav" class="animated" transition="navt">
                <li>日记</li>
                <li>笔记</li>
                <li>前端</li>
            </ul>
        </nav>
        <div class="logo"><a v-link="'/'">wanan</a></div>
        <div class="query">
            <div class="i"  v-if="!btns">
                <i class="iconfont" @click="onpenQuery"  v-if="$route.path=='/'">&#xe60d;</i>
                <i class="iconfont"  v-if="$route.path!='/'">&#xe605;</i>
            </div>
            <query :btn.sync="btns" v-if="btns"  transition="query"></query>
        </div>
    </header>
</template>
<script>
import query from "./query";
export default {
    data(){
        return {
            nav:false,
            btns:false
        }
    },
    methods:{
        navs:function(){
            if(this.nav){
                this.nav = false;
            }else {
                this.nav = true;
            }
        },
        onpenQuery:function(){
            this.btns = true;
        }
    },
    components:{
        query
    },
    init:function(){
        console.log(this.$route)
    }
}
</script>
<style lang="less">
@import "../assets/styles/_var.less";
@fontSize: 30px;
@height: 70px;
/* 必需 */
.navt-transition {
  transition: all .6s cubic-bezier(0, 0, 0.2, 1);
}
/* .navt-enter 定义进入的开始状态 */
/* .navt-leave 定义离开的结束状态 */
.navt-enter, .navt-leave {
    transform: translate3d(-200px, 0, 0);
    opacity: 0;
}
.query-transition {
  transition: all .6s cubic-bezier(0, 0, 0.2, 1);
}
/* .navt-enter 定义进入的开始状态 */
/* .navt-leave 定义离开的结束状态 */
.query-enter, .query-leave {
    opacity: 0;
}
header.index {
    position: relative;
    top: 0;
    height: @height;
    line-height: @height;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    padding: 0 30px;
    margin-bottom: 60px;
    position: fixed;
    width: 100%;
    background: rgba(255,255,255,.96);
    color: @7;
    z-index: 999;
    i {
        cursor: pointer;
        -moz-user-select:none;/*火狐*/
        -webkit-user-select:none;/*webkit浏览器*/
        -ms-user-select:none;/*IE10*/
        -khtml-user-select:none;/*早期浏览器*/
        user-select:none;
    }
    nav {
        position: absolute;
        top: 0;
        left: 30px;
        ul {
            border: 1px solid #eee;
            border-top: 0;
            margin: 0;
            margin-left: -30px;
            padding: 20px 40px;
            list-style-type: none;
            background: #fff;
            li {
                line-height: 3;
            }
        }
        .title {
            height: @height;
            line-height: @height;
            i {
                font-size: @fontSize;
            }
        }
    }
    .query {
        height: @height;
        line-height: @height;
        position: absolute;
        top: 0;
        right: 30px;
        .i {
            i{
                font-size: @fontSize;
            }

        }
        .title {
            line-height: @height;
            i {
                font-size: @fontSize;
            }
        }

    }
    .logo {
        text-align: center;
        height: @height;
        a{
            color: ＠7;
            transition: 0.3s all;
            font-size: @fontSize + 6;
            font-weight: 700;
            text-shadow: 0 0 2px #dcdcdc;
            &:hover {
                text-shadow: 0 0 5px #dcdcdc;
            }
        }
    }
}
</style>
