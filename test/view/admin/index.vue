<template>
    <div class="admin" v-if="loading" transition="op">
        <ul class="clearfix">
            <!--
            <li class="clearfix">
                <input type="checkbox" class="y"
                    @click="checkedAll"
                    v-model="checkedalls"
                >
                <div class="title col-6-n">
                    标题
                </div>
                <div class="time" style="text-align: center;">时间
                </div>
                <div class="dels" style="text-align: center;">
                    <button class="btn btn-del" @click="delAll">删除</button>
                </div>
            </li>
            -->
            <li class="clearfix" v-for="datas in data">
                <div class="container">
                    <div class="title">
                        <a v-link="{ name:'admin-article',params : {id : datas._id}}">{{datas.title}}</a>
                    </div>
                    <div class="time">
                        <span>{{datas.update_time[0]}}</span>
                    </div>
                    <div class="admin">
                        <span>{{datas.author}}</span>
                    </div>
                    <div class="dels" style="text-align: center;" @click="alertDel(datas._id)">
                        <i class="icon-trash"></i>
                    </div>
                    <div class="input">
                        <input type="checkbox" class="y" name="{{datas._id}}" id="{{datas._id}}" value="{{datas._id}}"
                            v-model="checkedData"
                        >
                    </div>
                </div>
            </li>
        </ul>
        <alert :show.sync="alert" :title="'确定要删除嘛？'" :cancel="del"></alert>
    </div>
</template>
<script>
import loading from "../../components/loading"
import alert from "../../components/alert"
import { alertshow, alerttitle, alertstyle, adminnav, loadingin } from '../../store/actions';
export default {
    vuex:{
        actions: {
          alertshow,
          alerttitle,
          alertstyle,
          adminnav,
          loadingin
        },
        getters:{
            nav:state => state.adminnav
        }
    },
    data(){
        return{
            data:{},
            checkedData:[],
            loading:false,
            checkedalls:false,
            alert:false,
            callbacks:null,
            id:null,
            mouse:false,
        }
    },
    methods: {
        alertDel:function(id){
            this.id = id;
            this.alert = true;
        },
        del:function() {
            this.$http.post("/admin/del",{
                id:this.id
            }).then((response)=>{
                if(response.data.op != "true"){
                    this.alertshow(true)
                    this.alertstyle("warn")
                    this.alerttitle("删除失败！！")
                }else {
                    this.alertshow(true)
                    this.alerttitle("删除成功！！")
                    this.$http.post("/admin",{
                        t:0
                    }).then((response)=>{
                        this.data = response.data;
                        this.id="";
                        this.alert = false;
                    })
                }
            })
        },
        // 全选，全不选
        checkedAll:function(){
            var that = this;
            if(that.checkedall) {
                if(that.checkedData != ""){
                    that.checkedData = [];
                }
                that.checkedall = false;
            }else {
                that.checkedData = [];
                that.data.forEach(function(item){
                    that.checkedData.push(item._id)
                })
                that.checkedall = true;
            }
        },
        delAll:function(){
            this.$http.post("/admin/del",{
                id:this.checkedData
            }).then((response)=>{
                if(response.data.op != "true"){
                    this.alertshow(true)
                    this.alertstyle("warn")
                    this.alerttitle("删除失败！！")
                }else {
                    this.alertshow(true)
                    this.alerttitle("删除成功！！")
                    this.$http.post("/admin",{
                        t:0
                    }).then((response)=>{
                        this.data = response.data;
                        this.id="";
                        this.alert = false;
                    })
                }
            })
        }
    },
    ready: function(){
        this.loadingin(true)
        this.$http.post("/index",{
            t:0
        }).then((response)=>{
            this.data = response.data.data;
            this.status = response.data.status;
            this.msg = response.data.msg;
            this.loadingin(false)
            this.loading = true;
        })
    },
    components: {
        loading,
        alert
    },
    beforeDestroy:function(){
        this.loadingin(true)
    }
}
</script>
<style lang="less">
div.admin {
    width: 100%;
    box-sizing: border-box;
    .btns {
        border-bottom: 1px #ccc solid;
        padding-bottom: 15px;
    }
    ul{
        margin: 0;
        padding: 0;
        list-style-type: none;
        padding: 0;
        li {
            position: relative;
            width: 25%;
            float: left;
            height: 180px;
            padding: 8px;
            box-sizing: border-box;
            div.container {
                transition: 0.3s all;
                height: 100%;
                border: 1px #d4e1ea solid;
                padding: 0 15px;
                &:hover {
                    box-shadow: 0 1px 5px -1px #ccc;
                }
                a{
                    color: #5c9ed8;
                }
                input.y {
                    float: left;
                }
                .title {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    height: 100px;
                    line-height: 100px;
                    font-size: 20px;
                    text-align: center;
                }
                .dels {
                    position: absolute;
                    right: 18px;
                    bottom: 25px;
                    color: #ff6c6c;
                    cursor: pointer;
                    :hover {
                        color: lighten(#ff6c6c,10%);
                    }
                    i {
                        font-size: 34px;
                    }
                }
                .time {
                    span{
                        font-size: 16px;
                        text-align: center;
                        padding: 0;
                        margin: 0;
                    }
                }
                .input {
                    position: absolute;
                    top: 18px;
                    right: 21px;
                }
            }
        }
    }
}
</style>
