<template>
    <div class="select-picker">
        <div class="input-wrapper" @click="on">
        </div>
        <span class="input-title" v-if="value == ''">
            {{placeholder}}
        </span>
        <span class="input-title" v-else>
            {{value}}
        </span>
        <dropdown 
            :data="data" 
            :value.sync="value" 
            v-show="isshow" 
            transition="select"
            :default="default"
        ></dropdown>
        <i class="iconfont icon-down" :class="{'i-bottom': isshow}" @click="on"></i>
    </div>
</template>
<script>
import dropdown from "./dropdown"
import { In } from "../utils"
export default {
    props:{
        data: Array,
        isshow: Boolean,
        placeholder:String,
        value:{
            type:String,
            default:""
        },
        default:{
            type:String,
            default:"请选择"
        }
    },
    ready:function(){
        let that = this;
        document.addEventListener('click',that.ifEl)
    },
    methods:{
        on:function(){
            if(this.isshow){
                this.isshow = false
            }else {
                this.isshow = true
            }
        },
        ifEl:function(e){
            if(!this.isshow)return
            if(!In(e.target, this.$el)){
                this.isshow = false
            }
        }
    },
    components: {
        dropdown
    },
    events: {
        'on': function (msg) {
          // 事件回调内的 `this` 自动绑定到注册它的实例上
          this.isshow = msg
        }
    },
    watch:{
        "isshow":function(e,news){
            if(!e){
                document.removeEventListener('click',this.ifEl)
            }else{
                document.addEventListener('click',this.ifEl)
            }
        }
    },
    beforeDestroy(){
        document.removeEventListener('click',this.ifEl)
    }
}
</script>
<style lang="less">
@import "./select";
</style>