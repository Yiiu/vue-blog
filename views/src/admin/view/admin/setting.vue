<template>
    <div class="admin-setting container main">
        <div class="setting-left">
            预览：(点击修改)
            <div class="list-header">
                <a class="logo">
                    <logos :width="44" color="#666"></logos>
                </a>
                <ul>
                    <y-tooltips v-for="(lists, index) in list" theme="white" placement="bottom">
                        <div class="list-up" slot="content" :index="index">
                            <input type="" name="" placeholder="标签名称" class="name" :value="lists.name">
                            <input type="" name="" placeholder="标签路径" class="path" :value="lists.path">
                            <p>
                                <y-button type="ghost" @click.native="upOneList">更新</y-button>
                            </p>
                        </div>
                        <li slot="html">{{lists.name}}</li>
                    </y-tooltips>
                    <y-tooltips theme="white" placement="bottom">
                        <div class="list-up" slot="content">
                            <input type="" name="" placeholder="标签名称" class="name">
                            <input type="" name="" placeholder="标签路径" class="path">
                            <p>
                                <y-button type="ghost" @click.native="addOneList">添加</y-button>
                            </p>
                        </div>
                        <li slot="html">+</li>
                    </y-tooltips>
                </ul>
            </div>
            <y-button @click.native="add" type="ghost" v-if="id == null">更新</y-button>
            <y-button @click.native="update" type="ghost" v-else>更新</y-button>
        </div>
    </div>
</template>
<script>
import logos from "../../../components/logo"
export default {
    data(){
        return {
            list:[],
            newList:[],
            listName:"",
            listPath:"",
            id:""
        }
    },
    created(){
        this.$store.dispatch("getNav")
        .then(e=>{
            if(e === null) {
                this.id = null
                this.list = []
            }else {
                this.id = e._id
                this.list = e.list
            }
        })
    },
    methods:{
        addList(){
            this.newData.push({
                name:this.listName,
                path:this.listPath
            })
        },
        add(){
            this.$store.dispatch("addNav", this.list)
            .then(e=>{
                this.$notify("更新成功")
            })
        },
        update(){
            this.$store.dispatch("upNav", {
                id:this.id,
                data:this.list
            })
            .then(e=>{
                this.$notify("更新成功")
            })
        },
        upOneList(e){
            let parent = e.target.offsetParent
            let name = parent.getElementsByClassName("name")[0].value
            let path = parent.getElementsByClassName("path")[0].value
            let index = parent.getElementsByClassName("list-up")[0].getAttribute("index")
            this.list.splice(index, 1, {
                name:name,
                path:path
            })
        },
        addOneList(e){
            let parent = e.target.offsetParent
            let name = parent.getElementsByClassName("name")[0].value
            let path = parent.getElementsByClassName("path")[0].value
            this.list.push({
                name:name,
                path:path
            })
        }
    },
    components:{
        logos
    }
}
</script>
<style lang="less">
.admin-setting {
    .list-header {
        padding: 6px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo {

            font-size: 38px;
        }
        ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
            li {
                color: fade(#000, 65%);
                margin-right: 22px;
                font-size: 16px;
            }
        }
    }
    .nav-form {
        input {
            width: 100%;
            font-size: 24px;
            padding: 6px 0;
            outline: none;
            border: none;
            resize: none;
        }
    }
}
.list-up {
    input {
        display: block;
        margin-bottom: 6px;
        padding: 4px;
        border: none;
        outline: none;
    }
    .y-btn {
        font-size: 12px;
        padding: 4px 8px;
    } 
}
</style>