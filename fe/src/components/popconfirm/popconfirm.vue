<template>
    <popover :isshow="isshow" :title="title" :placement="placement" :trigger="trigger" :style="'popconfirm'">
        <template slot="content"><slot></slot></template>
        <div slot="popconfirm">
            <button class="btn" 
                :class="{
                    'btn-default' : back.type == '',
                    'btn-primary': back.type == 'primary',
                    'btn-success': back.type == 'success',
                    'btn-warning': back.type == 'warning',
                    'btn-danger': back.type == 'danger',
                }"

                v-if="back.show"

                @click="backE"

            >

                {{back.text}}

            </button>

            <button class="btn" 
                :class="{
                    'btn-default' : ok.type == '',
                    'btn-primary': ok.type == 'primary',
                    'btn-success': ok.type == 'success',
                    'btn-warning': ok.type == 'warning',
                    'btn-danger': ok.type == 'danger',
                }"

                v-if="ok.show"

                @click="okE"

            >

                {{ok.text}}

            </button>
        </div>
    </popover>
</template>
<script>
import popover from "../popover"

export default {
    props:{
        title:String,
        isshow:{
            type: Boolean,
            default: false
        },
        placement:{
            type:String,
            default:"top"
        },
        trigger:{
            type:String,
            default:"click"
        },
        ok:{
            type:Object,
            default: function(){
                return {
                    show: true,
                    type:"primary",
                    text:"确定",
                }
            }
        },
        back:{
            type:Object,
            default: function(){
                return {
                    show: true,
                    type:"",
                    text:"取消",
                }
            }
        },
        okBtn:Function,
        backBtn:Function,
    },
    methods:{
        okE(){
            if(this.okBtn){
                this.okBtn()
            }
            this.isshow = false
        },
        backE(){
            if(this.backBtn){
                this.backBtn()
            }
            this.isshow = false
        },
    },
    components:{
        popover
    }
}
</script>