<template>
    <div class="col-6-c" transition="op">
        <input type="text" class="y block" placeholder="标题" v-model="title">
        <div class="col-5 p-r-c" >
            <input type="text" class="y block" placeholder="栏目" v-model="type">
        </div>
        <div class="col-5 p-l-c">
            <tag :tags.sync="tags"></tag>
        </div>
        <textarea name="" class="y block" cols="30" rows="10" v-model="content"></textarea>
        <button class="btn btn-default block" @click="create">on</button>
    </div>
</template>
<script>
import tag from "../../components/tag";
export default {
    data(){
        return {
            tags:[],
            title:"",
            content:"",
            type:"",
        }
    },
    methods:{
        create: function(){
            this.$http.post("/admin/add",{
                tags:this.tags,
                title:this.title,
                content:this.content,
                type:this.type,
            }).then((response)=>{
                window.location.href = "#/admin";
            })
        }
    },
    components: {
        tag
    },
}
</script>
