<template>
    <header>
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
    }
}
</script>
<style lang="less">
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
header {
    position: relative;
    top: 0;
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    padding: 0 30px;
    margin-bottom: 60px;
    position: fixed;
    width: 100%;
    background: rgba(255,255,255,.96);
    color: #6e8eae;
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
            margin-left: -30px;
            margin-top: -1px;
            padding: 20px 40px;
            list-style-type: none;
            background: #fff;
            li {
                line-height: 3;
            }
        }
        .title {
            height: 70px;
            line-height: 70px;
            i {
                font-size: 42px;
            }
        }
    }
    .query {
        height: 70px;
        line-height: 70px;
        position: absolute;
        top: 0;
        right: 30px;
        .i {
            i{
                font-size: 42px;
            }
            
        }
        .title {
            line-height: 70px;
            i {
                font-size: 42px;
            }
        }

    }
    .logo {
        text-align: center;
        a{
            color: #6e8eae;
            transition: 0.3s all;
            font-size: 48px;
            font-family: "Muli";
            text-shadow: 0 0 2px #dcdcdc;
            &:hover {
                text-shadow: 0 0 5px #dcdcdc;
            }
        }
    }
}
</style>