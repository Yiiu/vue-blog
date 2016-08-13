<template>
    <div class="admin col-6-c" v-if="loading" transition="op">
        <div class="btns clearfix">
            <a v-link="{ name:'index' }" class="btn btn-blue" style="font-size: 16px;float: left;">返回首页</a>
            <a v-link="{ name:'add' }" class="btn btn-blue" style="font-size: 16px;float: right;">发布新文章</a>
        </div>
        <ul>
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
            <li class="clearfix"
                v-for="datas in data"
            >
                <input type="checkbox" class="y" name="{{datas._id}}" id="{{datas._id}}" value="{{datas._id}}"
                    v-model="checkedData"
                >
                <div class="title col-6-n">
                    <a v-link="{ name:'admin-article',params : {id : datas._id}}">{{datas.title}}</a>
                </div>
                <div class="time">
                    <p>{{datas.time[0]}}</p>
                </div>
                <div class="dels" style="text-align: center;">
                    <button class="btn btn-del"
                        @click="alertDel(datas._id)"
                    >删除</button>
                </div>
            </li>
        </ul>
        <alert :show.sync="alert" :title="'确定要删除嘛？'" :cancel="del"></alert>
    </div>
</template>
<script>
import loading from "../../components/loading"
import alert from "../../components/alert"
import { alertshow, alerttitle, alertstyle } from '../../store/actions';
export default {
    vuex:{
        actions: {
          alertshow,
          alerttitle,
          alertstyle
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
    init: function(){
        this.$http.post("/admin",{
            t:0
        }).then((response)=>{
            this.data = response.data;
            this.loading = true;
        })
    },
    components: {
        loading,
        alert
    }
}
</script>
<style lang="less">
.admin {
    .btns {
        border-bottom: 1px #ccc solid;
        padding-bottom: 15px;
    }
    ul{
        list-style-type: none;
        padding: 0;
        li {
            border-bottom: 1px solid #dcdcdc;
            padding-bottom: 5px;
            margin-bottom: 10px;
            a{
                color: #5c9ed8;
            }
            input.y {
                float: left;
            }
            .title {
                padding-left: 10px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .dels {
                text-align: center;
                float: right;
                margin-right: 4px;
            }
            .time {
                float: left;
                width: 120px;
                p{
                    font-size: 16px;
                    text-align: center;
                    padding: 0;
                    margin: 0;
                }
            }
        }
    }
}
</style>
