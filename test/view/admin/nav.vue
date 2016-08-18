<template lang="html">
    <nav class="admin">
        <ul>
            <li class="up" @click="adminnav">
                <a　@submit.prevent><i class="iconfont">&#xe618;</i><span>收起</span></a></li>
            <li>
                <a href="#"><i class="iconfont">&#xe610;</i><span>文章</span></a>
            </li>
            <li>
                <a v-link="{ path: 'addtype' }"><i class="iconfont">&#xe623;</i><span>分类</span></a>
            </li>
            <li>
                <a href="#"><i class="iconfont">&#xe637;</i><span>标签</span></a>
            </li>
            <li>
                <a href="#"><i class="iconfont">&#xe62b;</i><span>评论</span></a>
            </li>
        </ul>
    </nav>
</template>
<script>
import { adminnav } from '../../store/actions';
export default {
    vuex:{
        actions: {
            adminnav
        }
    }
}
</script>
<style lang="less">
nav.admin {
    transition: 0.3s width;
    position: fixed;
    top: 0;
    width: 55px;
    background: #f8f8f8;
    border-right: 1px #e1e1e1 solid;
    height: 100%;
    overflow: hidden;
    z-index: 999;
    &.open {
        width: 120px;
    }
    ul {
        margin: 0;
        padding: 0;
        width: 120px;
        li {
            height: 55px;
            line-height: 55px;
            a {
                display: block;
                height: 100%;
            }
            border-bottom: 1px #e1e1e1 solid;
            &.up {
                height: 65px;
                line-height: 65px;
                i {
                    height: 65px;
                    line-height: 65px;
                    font-size: 26px;
                }
            }
            i {
                display: inline-block;
                width: 55px;
                height: 55px;
                text-align: center;
                font-size: 26px;
            }
            span {
                display: block;
                float: right;
                width: 65px;
                font-size: 18px;
            }
        }
    }
}
</style>
