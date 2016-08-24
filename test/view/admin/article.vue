<template>
    <div transition="op">
        <input type="text" class="y block" placeholder="标题" v-model="data.title">
        <div class="col-5 p-r-c" >
            <select class="types" v-model="data.type">
                <option value="">未分类</option>
                <option value="{{data._id}}" v-for="data in type">{{ data.name }}</option>
            </select>
        </div>
        <div class="col-5 p-l-c">
            <tag :tags.sync="tags"></tag>
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
                type:"",
            },
            type:[],
            tags:[],
            oldtag:[],
            oldtype:"",
        }
    },
    methods:{
        update: function(){
            let ids = this.$route.matched[1].params.id;
            this.$http.post("/admin/update",{
                id:ids,
                data:this.data, 
                tags:this.tags,
                oldtype:this.oldtype,
                oldtag:this.oldtag,
            }).then((response)=>{
                this.data = response.data;
                window.location.href = "#/admin";
            })
        }
    },
    components: {
        tag
    },
    ready:function(){
        let ids = this.$route.matched[1].params.id;
        this.$http.post("/admin/id",{
            id:ids
        }).then((response)=>{
            this.data = response.data;
            this.oldtype = response.data.type;
            this.$http.post("/types",).then((type) =>{
                this.type = type.data;
            })
            this.$http.post("/tags",{tags:this.data.tags}).then((tag) =>{
                console.log(tag)
                this.oldtag = tags.data;
                this.oldtag.forEach((item)=>{
                    this.tags.push(item.name)
                });
            })
        })
    }
}
</script>
