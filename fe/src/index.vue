<template>
        <a v-link="{path:'/test'}">asdasd</a>
        <button class="btn btn-default">test</button>
        <button class="btn btn-primary">test</button>
        <button class="btn btn-success">test</button>
        <button class="btn btn-warning">test</button>
        <button class="btn btn-danger" @click="modal_btn">test</button>
        <y-select 
            :data="data1" 
            :placeholder="'标签'" 
            :value.sync="value"
            :default="defaults"
        ></y-select>
        <y-alert :type="'success'" :icon="true">
            <h2 slot="title">test</h2>
            <p slot="description">成功提示的文案成功提示的文案成功提示的文案成功提示的文案成功提示的文案成功提示的文案成功提示的文案
            成功提示的文案成功提示的文案成功提示的文案成功提示的文案成功提示的文案成功提示的文案成功提示的文案
            成功提示的文案成功提示的文案成功提示的文案成功提示的文案成功提示的文案成功提示的文案成功提示的文案
            成功提示的文案成功提示的文案成功提示的文案成功提示的文案成功提示的文案成功提示的文案成功提示的文案</p>
        </y-alert>
        <y-popover :content="'asdfasdfcxzv'" :placement="'bottom'" :trigger="'click'"><span>test</span></y-popover>
        <y-popover :placement="'right'">
            <span slot="content">asdf</span>
            <ul slot="html">
                <li><a href="">qwer</a></li>
                <li><a href="">qwer</a></li>
                <li><a href="">qwer</a></li>
            </ul>
        </y-popover>
        <y-popover :title="'saafsdfsdfa'" :content="'asdfasdfcxzv'" :placement="'bottom'">
            <input type="text" slot="content">
        </y-popover>
        <y-popconfirm :title="'testst'">
            <span>ssssss</span>
        </y-popconfirm>
</template>
<script type="text/javascript">
import ySelect from "./components/select"
import yModal from "./components/modal"
import yAlert from "./components/alert"
import yPopover from "./components/popover"
import yPopconfirm from "./components/popconfirm"
export default {
    data:function(){
        return {
            data1:["asa","asdf"],
            value:"asa",
            defaults:"请添加标签",
            mShow:false
        }
    },
    methods:{
        mShowOn:function(){
            this.mShow = true
        },
        mShowDown:function(){
            this.mShow = false
        },
        modal_btn:function(){
            this.$Modal.init({
                title:"你好",
                content:"tsetestestesetste",
                ok:function(){console.log("test")},
                okBtn:{show: true,type:"primary",text:"确定"},
                backBtn:{show: true,type:"",text:"取消"}
            })
        }
    },
    ready:function(){
    },
    components:{
        ySelect,
        yModal,
        yAlert,
        yPopover,
        yPopconfirm
    }
}
</script>
<style lang="less">
@import "./assets/style/init";
</style>