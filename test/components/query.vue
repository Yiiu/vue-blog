<template>
    <div class="search">
        <i class="iconfont" @click="out">&#xe60c;</i>
        <div class="container">
            <input type="text" class="y" v-model="inputs" @keyup.enter="query">
            <i class="iconfont" @click="query">&#xe60d;</i>
        </div>
        <div class="datas col-4-c">
            <ul @click="out">
                <li v-for="data in datas">
                    <a v-link="{ name:'article',params : {id : data._id}}">
                        <h4>{{data.title}}</h4>
                        <p>{{data.content}}</p>
                    </a>
                </li>
            </ul>
        </div>
        <p v-if="nono">没有查找到。。试试别的看看</p>
        <p v-if="yyy">键盘回车也可以搜索哒。。</p>
    </div>
</template>
<script>
export default {
    props:["btn"],
    data(){
        return {
            inputs:"",
            datas:[],
            nono: false,
            yyy: true
        }
    },
    methods:{
        query:function(){
            this.$http.post("/querys",{
                title:"title",
                cc:this.inputs
            }).then((response)=>{
                this.datas = [];
                this.yyy = false
                if(response.data.op){
                    this.nono = true;
                }else {
                    this.datas = response.data;
                    this.nono = false;
                }

            })
        },
        out:function(){
            this.btn = false;
        }
    }
}
</script>
<style lang="less">
.query .search{
    overflow-y: overlay;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(255,255,255,.8);
    z-index: 8;
    >p {
        position: absolute;
        top: 200px;
        font-size: 48px;
        text-align: center;
        width: 100%;
    }
    >i{
        position: absolute;
        right: 30px;
    }
    .datas{
        position: absolute;
        top: 210px;
        ul {
            list-style-type: none;
            padding: 0;
            li{
                font-size: 24px;
                line-height: 24px;
                margin: 5px 0;
                h4 {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size: 28px;
                    margin: 0;
                    line-height: 34px;
                    a{
                        color: #4f6a85;
                    }
                }
                p{
                    margin: 0;
                    font-size: 18px;
                    color: #63b6ff;
                }
            }
        }
    }
    .container {
        width: 400px;
        font-size: 42px;
        position: relative;
        margin-left: -200px;
        top: 125px;
        left: 50%;
        i{
            position: absolute;
            top: 29px;
            right: 12px;
            width: 42px;
            height: 62px;
            margin-top: -21px;
            text-align: center;
            font-size: 32px;
            color: #acacac;
        }
        input {
            width: 400px;
        }
    }
}
@media screen and (max-width:768px) {
    .query .title .container input {
        width: 250px
    }
    .query .title .container {
        width: 250px;
        font-size: 42px;
        position: relative;
        margin-left: -125px;
        top: 125px;
        left: 50%;
    }
    .query .title>p {
        font-size: 28px;
    }
}
</style>
