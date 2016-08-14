<template>
    <div class="alert" v-if="show" transition="tt" @click.self="back"><slot></slot>
        <div class="container" v-if="show"  transition="alerts">
            <p class="title">{{title}}</p>
            <p class="button">
                <button class="btn" @click="_cancel">{{cancelText}}</button><button class="btn" @click="_ok">{{okText}}</button>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        title:String,
        show:{
            type: Boolean,
            default:true,
        },
        cancelText: {
            type: String,
            default:"删除",
        },
        okText: {
            type: String,
            default:"取消",
        },
        ok: {
            type: Function,
            default:()=>{},
        },
        cancel: {
            type: Function,
            default:()=>{},
        },
    },
    methods:{
        back:function(){
            this.show = false;
        },
        _ok:function(){
            this.ok();
            this.show = false;
        },
        _cancel:function(){
            this.cancel();
        }
    },
    watch:{
        show: function(){
            let y = window.pageYOffset;
            if(this.show == false) {
                let y = document.body.style.top.replace(/px/ig,"");
                document.body.removeAttribute("style");
                window.scrollTo(0,-y);
            }else {
                document.body.style.top = - y + "px";
                document.body.style.position = "fixed";
                document.body.style.width = "100%";
            }
        }
    }

}
</script>
<style lang="less">
.alert{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: hsla(0,0%,100%,.8);
    z-index: 9999;
    .container {
        width: 300px;
        height: 150px;
        background: #fff;
        position: relative;
        top: 50%;
        left: 50%;
        margin-left: -150px;
        margin-top: -75px;
        border-radius: 6px;
        box-shadow: 0 6px 120px 17px #e1e1e1;
        >p.title {
            line-height: 100px;
            margin: 0;
            padding: 0 30px;
            color: #767676;
            font-size: 20px;
        }
        >p.button {
            position: absolute;
            right: 5px;
            bottom: 10px;
            margin: 0;
            button {
                font-size: 16px;
                color: #2291e9;
            }
        }
    }
}
.tt-transition {
  transition: all .3s ease;
}

/* .expand-enter 定义进入的开始状态 */
/* .expand-leave 定义离开的结束状态 */
.tt-enter, .tt-leave {
  opacity: 0;
}
.alerts-transition {
  transition: all .3s ease;
}

/* .expand-enter 定义进入的开始状态 */
/* .expand-leave 定义离开的结束状态 */
.alerts-enter {
      transform: scale(1.4);
      opacity: 0;
}
.alerts-leave{
      transform: scale(0.6);
      opacity: 0;
}
</style>
