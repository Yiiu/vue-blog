<template>
    <header　v-if="$route.matched[0].handler.name !='admin'" class="index">
        <nav>
            <div class="title">
                <span @click="navs" class="d">Menu</span>
            </div>
            <ul v-show="nav" class="animated" transition="navt">
                <li>日记</li>
                <li>笔记</li>
                <li>前端</li>
            </ul>
        </nav>
        <div class="logo"><a v-link="'/'">W</a></div>
        <div class="query">
            <span class="d" @click="onpenQuery" v-if="$route.path=='/'">
                Search
            </span>
            <span class="d" v-if="$route.path!='/'">
                Photo
            </span>
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
@import "../assets/styles/_var.less";
@fontSize: 30px;
@height: 70px;
header.index {
    position: relative;
    top: 0;
    height: @height;
    line-height: @height;
    box-sizing: border-box;
    padding: 0 30px;
    margin-bottom: 60px;
    position: fixed;
    width: 100%;
    background: #fff;
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
    .title {
        height: @height;
        line-height: @height;
        text-align: center;
    }
    .d {
        display: block;
        height: 100%;
        width: 100%;
        text-align: center;
        cursor: pointer;
    }
    nav {
        position: absolute;
        top: 0;
        left: 30px;
        width: 120px;
        hehght: @height;
        line-hehght: @height;
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
    }
    .query {
        height: @height;
        line-height: @height;
        position: absolute;
        width: 120px;
        top: 0;
        right: 30px;
        text-align: center;
    }
    .logo {
        text-align: center;
        height: @height;
        a{
            color: @7;
            transition: 0.3s all;
            font-size: @fontSize + 6;
            font-weight: 700;
            text-shadow: 0 0 1px #dcdcdc;
            &:hover {
                text-shadow: 0 0 5px #dcdcdc;
            }
        }
    }
}
</style>
