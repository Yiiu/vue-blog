<template>
    <div class="alert" transition="alert-op" v-if="isshow" :class="{
        'alert-success': type == 'success',
        'alert-info': type == 'info',
        'alert-warning': type == 'warning',
        'alert-danger': type == 'danger',
    }
    ">
        <i class="iconfont" v-if="icon" :class="{
            'icon-checkcircle': type == 'success',
            'icon-infocircle': type == 'info',
            'icon-exclamationcircle': type == 'warning',
            'icon-crosscircle': type == 'danger',
        }">
        </i>
        <div class="alert-c" v-el:contents>
            <slot name="title"></slot>
            <slot name="description"></slot>
        </div>
        <i class="iconfont icon-cross alert-del" @click="del"></i>
    </div>
</template>
<script>
export default {
    data(){
        return{
            slot:true,
        }
    },
    computed: {
        modal () {
            return this.$root.TEST
        }
    },
    props: {
        type:String,
        icon:Boolean,
        isshow:{
            type:Boolean,
            default: true
        },
        time:{
            type: Number,
            default: 0 
        }
    },
    ready: function(){
        let that = this;
        if(that.time){
            let timer = setInterval(function(){
                that.del()
                clearInterval(timer)
            },that.time)
        }else {
            return
        }
    },
    methods:{
        del: function(){
            this.isshow = false
        }
    }
}
</script>
<style lang="less">
@import "./alert";
</style>