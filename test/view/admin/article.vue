<template>
    <div transition="op" v-if="loading">
        <input type="text" class="y block" placeholder="标题" v-model="data.title">
        <div class="col-5 p-r-c" >
            <select class="types" v-model="data.type">
                <option value="">未分类</option>
                <option value="{{data._id}}" v-for="data in type.data">{{ data.name }}</option>
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
import { loadingin } from '../../store/actions';
export default {
    vuex:{
        actions:{
            loadingin:loadingin
        }
    },
    data(){
        return {
            data:{},
            type:{},
            status:"",
            msg:"",
            loading:false,
        }
    },
    methods:{
        update: function(){
            let ids = this.$route.params.id;
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
    ready:function(){
        this.loadingin(true)
        let ids = this.$route.params.id;
        this.$http.post("/article",{
            id:ids
        }).then((response)=>{
            this.$http.get("/types").then((response) =>{
                this.type = response.data;
            })
            this.data = response.data.data;
            this.data.tags = this.data.tags.map((t)=>{
                return t.name;
            })
            this.status = response.data.status;
            this.msg = response.data.msg;
            this.loading = true;
            this.loadingin(false)
        })
    },
    beforeDestroy:function(){
        this.loadingin(true)
    }
}
</script>
