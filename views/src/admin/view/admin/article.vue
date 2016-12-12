<template>
    <div class="admin-article main">
        <h2 class="title">
            文章列表
        </h2>
        <div class="list">
            <table  v-if="data.length !==0">
                <thead>
                    <tr>
                        <th width="92"><y-checkbox></y-checkbox>全选</th>
                        <th>文章标题</th>
                        <th>最近更新</th>
                        <th>文章状态</th>
                        <th>文章操作</th>
                    </tr>
                </thead>

                <transition-group name="table" tag="tbody">
                    <tr v-for="articles in data" :key="articles._id">
                        <td><y-checkbox v-model="test" :label="articles._id" content></y-checkbox></td>
                        <td class="title"><router-link :to="`/up/article/${articles._id}`">{{articles.title}}</router-link></td>
                        <td class="time">{{articles.time[1]}}</td>
                        <td class="enabled">{{articles.enabled}}</td>
                        <td class="t">

                        <y-popconfirm
                            title="是否删除该文章？"
                            :ok-cbk="delArticle.bind(this, articles._id)"
                        >
                            <y-button type="ghost" color="red" slot="html">删除</y-button>
                        </y-popconfirm>
                        </td>
                    </tr>
                </transition-group>
            </table>
            <p class="none" v-else>还没有发布文章~快来写一篇吧~ <router-link to="/add/article">添加</router-link></p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            test:[],
            data:[],
            tests:false
        }
    },
    methods:{
        delArticle(id){
            console.log(id)
            this.$store.dispatch("delArticle", id)
            .then(test=>{
                this.$notify("删除成功")
                this.getIndex()
            })
        },
        getIndex(){
            this.$store.dispatch("getIndex")
            .then(data=>{
                this.data = data
            })
        }
    },
    created(){
        this.getIndex()
    }
}
</script>
<style lang="less">
.admin-main {
    .list {
        overflow: auto;
        .title {
            min-width: 265px;
        }
        .time {
            min-width: 105px;
        }
        .enabled {
            min-width: 80px;
        }
        .title {
            min-width: 265px;
        }
    }
}
.table-move, .table-enter-active, .table-leave-active {
    transition:all .5s cubic-bezier(.55,0,.1,1)
}
.table-enter{
  opacity:0;
  transform:translate(30px, 0);
}
.table-leave-active {
  position:absolute;
  opacity:0;
}
</style>
