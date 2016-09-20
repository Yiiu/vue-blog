<template>
    <slot name="content"></slot>
    <div class="popover-box popover-white"
        :class="{
            'popover-box-bottom':placement == 'bottom',
            'popover-box-top':placement == 'top',
            'popover-box-right':placement == 'right',
            'popover-box-left':placement == 'left',
            'popconfirm':style == 'popconfirm'
        }"
        v-el:pop
        v-show="isshow"
        transition="popover"
        >
        <div class="popover-content">
            <div class="popover-delta">
            </div>
            <slot name="html"></slot>
            <div class="popover-title" v-if="title!=''">
                <i class="iconfont icon-infocircle" v-if="style"></i>
                {{title}}
            </div>
            <div class="popover-text" v-if="content!=''">
                {{content}}
            </div>
            <slot name="popconfirm" class="popconfirm-btn"></slot>
        </div>
    </div>
</template>
<script>
import { In } from "../utils"
export default {
    props:{
        isshow:{
            type:Boolean,
            default: false
        },
        title:{
            type:String,
            default:""
        },
        content:{
            type:String,
            default:""
        },
        type:{
            type:String,
            default:""
        },
        placement:{
            type:String,
            default:"top"
        },
        trigger:{
            type:String,
            default:"click"
        },
        style:String,
    },
    // 获取el的位置
    // 然后获取
    methods:{
        bottomOffset:function(el, cont){
            let left = el.offsetLeft;
            let top = el.offsetTop;
            let elWidth = el.offsetWidth;
            let elHeight = el.offsetHeight;
            let contWidth = cont.offsetWidth;
            let contHeight = cont.offsetHeight;

            cont.style.left = left + -contWidth/2 + elWidth/2 + "px";
            cont.style.top = top + +elHeight + -3 + "px";
        },
        topOffset:function(el, cont){
            let left = el.offsetLeft;
            let top = el.offsetTop;
            let elWidth = el.offsetWidth;
            let elHeight = el.offsetHeight;
            let contWidth = cont.offsetWidth;
            let contHeight = cont.offsetHeight;

            cont.style.left = left + -contWidth/2 + elWidth/2 + "px";
            cont.style.top = top + -contHeight + -3 + "px";
        },
        leftOffset:function(el, cont){
            let left = el.offsetLeft;
            let top = el.offsetTop;
            let elWidth = parseInt(el.offsetWidth);
            let elHeight = parseInt(el.offsetHeight);
            let contWidth = parseInt(cont.offsetWidth);
            let contHeight = parseInt(cont.offsetHeight);

            cont.style.left = left + -contWidth + -3 +"px";
            cont.style.top = top + -contHeight/2 + elHeight/2 + "px";
        },
        rightOffset:function(el, cont){
            let left = el.offsetLeft;
            let top = el.offsetTop;
            let elWidth = el.offsetWidth;
            let elHeight = el.offsetHeight;
            let contWidth = cont.offsetWidth;
            let contHeight = cont.offsetHeight;

            cont.style.left = left + elWidth + 3 + "px";
            cont.style.top = top + -contHeight/2 + elHeight/2 + "px";
        },
        event:function(el, events, fun){
            let that = this;
            let time = 200;
            let pop = this.$els.pop
            if(events == "hover"){
                let hoverTimer = null
                el.addEventListener("mouseover", function(){
                    if(!that.isshow){
                        that.isshow = true
                    }
                    clearTimeout(hoverTimer)
                })
                el.addEventListener("mouseout", function(){
                    hoverTimer = setTimeout(function(){
                        that.isshow = false
                    }, time)
                })
                pop.addEventListener("mouseover", function(){
                    clearTimeout(hoverTimer)
                })
                pop.addEventListener("mouseout", function(){
                    hoverTimer = setTimeout(function(){
                        that.isshow = false
                    }, time)
                })
            }else if(events == "blur"){
                el.addEventListener("focus", function(){
                    if(!that.isshow){
                        that.isshow = true
                    }
                })
                el.addEventListener("blur", function(){
                    if(that.isshow){
                        that.isshow = false
                    }
                })
            }else {
                el.addEventListener("click", function(e){
                    if(!that.isshow){
                        that.isshow = true
                    }else {
                        that.isshow = false
                    }
                }, false)
            }
        },
        ifEl:function(e){
            if(!this.isshow) {
                return
            }
            if(!In(e.target, this.$el.nextElementSibling)){
                this.isshow = false
            }
        },
        Offset:function(content, pop){
                if(this.placement == "left"){
                    this.leftOffset(content, pop);
                }else if(this.placement == "right"){
                    this.rightOffset(content, pop);
                }else if(this.placement == "top"){
                    this.topOffset(content, pop);
                }else {
                    this.bottomOffset(content, pop);
                }
        }
    },
    created(){
    },
    ready:function(){
        const that = this;
        let content = that.$el.nextElementSibling;  // 内容
        let pop = that.$els.pop; // 弹窗

        that.event(content, that.trigger)


        document.body.appendChild(pop);
    },
    watch:{
        "isshow":function(e){
            let content = this.$el.nextElementSibling;  // 内容
            let pop = this.$els.pop; // 弹窗
            if(e) {
                this.Offset(content, pop)
                document.addEventListener('click',this.ifEl)
                window.addEventListener('resize',this.ifEl)
                window.addEventListener("resize", this.Offset(content, pop))
            }else {
                document.removeEventListener('click',this.ifEl)
                window.removeEventListener('resize',this.ifEl)
                window.removeEventListener("resize", this.Offset)
            }
        }
    },
    beforeDestroy(){
        document.removeEventListener('click',this.ifEl)
    }
}
</script>
<style lang="less">
@import "./popover";
</style>