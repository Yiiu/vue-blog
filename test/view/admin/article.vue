<template>
    <div transition="op" transition-mode="out-in">
        <input type="text" class="y block" placeholder="标题" v-model="data.title">
        <div class="col-5 p-r-c" >
            <select class="types" v-model="data.type">
                <option value="">未分类</option>
                <option value="{{data._id}}" v-for="data in type">{{ data.name }}</option>
            </select>
        </div>
        <div class="col-5 p-l-c">
            <tag :tags.sync="data.tags"></tag>
        </div>
        <textarea name="" class="y block" cols="30" rows="10" v-model="data.content"></textarea>
        <button class="btn btn-default block" @click="update">on</button>
    </div>
</template>
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
            type:[],
            oldtype:"",
        }
    },
    methods:{
        update: function(){
            let ids = this.$route.matched[1].params.id;
            this.$http.post("/admin/update",{
                id:ids,
                data:this.data, 
                oldtype:this.oldtype 
            }).then((response)=>{
                this.data = response.data;
                window.location.href = "#/admin";
            })
        }
    },
    components: {
        tag
    },
    init:function(){
        let ids = this.$route.matched[1].params.id;
        this.$http.post("/admin/id",{
            id:ids
        }).then((response)=>{
            console.log(response.data)
            this.data = response.data;
            this.oldtype = response.data.type;
            this.$http.post("/types",).then((type) =>{
                this.type = type.data;
            })
        })
    }
}
</script>
