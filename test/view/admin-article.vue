<template>
    <div class="col-6-c"  transition="op">
        <a v-link="{ name:'admin' }" class="btn btn-blue" style="font-size: 16px;margin-bottom: 15px;">返回管理</a>
        <input type="text" class="y block" placeholder="标题" v-model="data.title">
        <div class="col-5 p-r-c" >
            <input type="text" class="y block" placeholder="栏目" v-model="data.type">
        </div>
        <div class="col-5 p-l-c">
            <tag :tags.sync="data.tags"></tag>
        </div>
        <textarea name="" class="y block" cols="30" rows="10" v-model="data.content"></textarea>
        <button class="btn btn-default block" @click="update">on</button>
    </div>
</template>
<script>
import tag from "../components/tag";
export default {
    data(){
        return {
        	data:{}
        }
    },
    methods:{
        update: function(){
            let ids = this.$route.matched[1].params.id;
            this.$http.post("/admin/update",{
                id:ids,
                data:this.data
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
            this.data = response.data;
        })
    }
}
</script>