<template>
    <div transition="op">
        <input type="text" class="x block" placeholder="标题" v-model="data.title">
        <div class="col-5 p-r-c" >
            <select class="types" v-model="data.type">
                <option value="">未分类</option>
                <option value="{{data._id}}" v-for="data in type.data">{{ data.name }}</option>
            </select>
        </div>
        <div class="col-5 p-l-c">
            <tag :tags.sync="data.tags"></tag>
        </div>
        <textarea name="" class="x block" cols="30" rows="10" v-model="data.content"></textarea>
        <button class="btn btn-default block" @click="create">on</button>
    </div>
</template>
<style lang="less">
select.types {
    width: 100%;
    height: 58px;
    background: #fff;
    border: 2px #d2d2d2 solid;
    border-radius: 3px;
    margin-bottom: 15px;
}
</style>
<script>
import tag from "../../components/tag";
export default {
    data(){
        return {
            data:{
                title:"",
                content:"",
                tags:[],
                type:"",
            },
            tags:[],
            type:{}
        }
    },
    methods:{
        create: function(){
            this.$http.post("/admin/add",this.data).then((response)=>{
                console.log(response.data)
                window.location.href = "#/admin";
            })
        }
    },
    components: {
        tag
    },
    ready:function(){
        this.$http.get("/types").then((response) =>{
            console.log(response)
            this.type = response.data;
        })
    }
}
</script>
