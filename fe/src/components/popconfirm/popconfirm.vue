<template>
    <div class="popconfirm-box">
        <popover :title="isshow" :placement="placement" :trigger="trigger">
            <template slot="button">
                <button class="btn" 
                
                    :class="{
                        'btn-default' : backBtn.type == '',
                        'btn-primary': backBtn.type == 'primary',
                        'btn-success': backBtn.type == 'success',
                        'btn-warning': backBtn.type == 'warning',
                        'btn-danger': backBtn.type == 'danger',
                    }"

                    v-if="backBtn.show"

                    @click="backE"

                >

                    {{backBtn.text}}

                </button>

                <button class="btn" 
                    :class="{
                        'btn-default' : okBtn.type == '',
                        'btn-primary': okBtn.type == 'primary',
                        'btn-success': okBtn.type == 'success',
                        'btn-warning': okBtn.type == 'warning',
                        'btn-danger': okBtn.type == 'danger',
                    }"

                    v-if="okBtn.show"

                    @click="okE"

                >

                    {{okBtn.text}}

                </button>
            </template>
        </popover>
    </div>
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
            default:{
                show: true,
                type:"primary",
                text:"确定",
            }
        },
        back:{
            type:Object,
            default:{
                show: true,
                type:"",
                text:"取消",
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