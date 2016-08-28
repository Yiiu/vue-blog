<template lang="html">
    <nav class="admin" transition="op">
        <ul>
            <li class="logo">
                <a v-link="'/admin'">W</a>
            <li>
                <a href="#"><i class="icon-align-left"></i><span>文章</span></a>
            </li>
            <li>
                <a v-link="{ path: '/admin/addtype' }"><i class="icon-command"></i><span>分类</span></a>
            </li>
            <li>
                <a href="#"><i class="icon-tag"></i><span>标签</span></a>
            </li>
            <li>
                <a href="#"><i class="icon-speech-bubble"></i><span>评论</span></a>
            </li>
            <li>
                <a href="#"><i class="icon-cog"></i><span>设置</span></a>
            </li>
            <li class="bottom">
                <a v-link="{ path: '/admin/add' }"><i class="icon-open"></i><span>新建文章</span></a>
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
@import "../../assets/styles/_var";
nav.admin {
    transition: 0.3s width;
    position: fixed;
    top: 0;
    width: @ad-nav-h;
    background: #fff;
    border-right: 1px @ad-border-c solid;
    height: 100%;
    overflow: hidden;
    z-index: 999;
    &.open {
        width: @ad-nav-w;
    }
    ul {
        margin: 0;
        padding: 0;
        width: @ad-nav-w;
        li {
            height: @ad-nav-h;
            line-height: @ad-nav-h;
            a {
                display: block;
                height: 100%;
                color: @ad-a-c;
            }
            &.logo {
                margin-bottom: 15px;
                a {
                    width: @ad-nav-h;
                    height: @ad-nav-h;
                    line-height: @ad-nav-h;
                    background: @8;
                    color: #fff;
                    font-size: 42px;
                    text-align: center;
                }
            }
            &.bottom {
                position: absolute;
                bottom: 25px;
            }
            i {
                display: inline-block;
                width: @ad-nav-h;
                height: @ad-nav-h;
                line-height: @ad-nav-h;
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
