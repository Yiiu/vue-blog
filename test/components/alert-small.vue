<template>
    <div :class="{
            'alert-small': true,
            'alert-warn': (style=='warn'),

        }" v-if="show" transition="alertsmall">
        <span>{{ title }}</span>
        <i class="iconfont" @click="alertshow(true)">&#xe60c;</i>
        <div class="axis" v-bind:style="{transition: time/1000 + 's width linear'}" transition="axis"  v-if="show"></div>
    </div>
</template>
<script>
import { alertshow, alerttitle, alertstyle } from '../store/actions' ;
import { getAlertshow,getAlertTitle,getAlertStyle,getAlertTime } from '../store/getters' ;

export default {
    vuex:{
        getters:{
            show: state => state.alertshow,
            title: state => state.alerttitle,
            style: state => state.alertstyle,
            time: state => state.alerttime,
        },
        actions:{
            alertshow,
            alerttitle,
            alertstyle
        }
    },
    watch:{
        show:function(){
            let that = this;
            if(that._timeout){
                clearTimeout(that._timeout)
            }
            that._timeout = setTimeout(function(){
                that.alertshow(false);
                that.alertstyle("");
            },that.time)
        }
    }
}
</script>
<style lang="less">
.alert-warn {
    background: #ea6f6f !important;
    color: #fff !important;
}
.alert-small {
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: rgba(92, 232, 152, 0.97);
    text-align: center;
    color: #5f5f5f;
    span{
        line-height: 60px;
        font-size: 20px;
    }
    i{
        position: absolute;
        right: 30px;
        line-height: 60px;
        cursor: pointer;
    }
    >.axis {
        transition: width 3s;
        top: 0;
        position: absolute;
        height: 2px;
        background: #63b6ff;
        z-index: 99999;
        width: 100%;
    }
    >.axis-enter {
        width: 0%;
    }
}
.alertsmall-transition{
    transition: 0.3s all;
}
.alertsmall-enter {
    transform: translate(0,-60px);
}
.alertsmall-leave {
    
    transform: translate(0,-60px);
}
</style>