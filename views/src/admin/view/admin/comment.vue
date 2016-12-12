<template>
    <div class="admin-comment main">
        <h2 class="title">
            标签列表
        </h2>
        <div class="list">
            <table v-if="data.length!=0">
                <thead>
                    <tr>
                        <th width="92"><y-checkbox></y-checkbox>全选</th>
                        <th>作者</th>
                        <th>内容</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="comment in data">
                        <td><y-checkbox v-model="test" :label="comment._id" content></y-checkbox></td>
                        <td class="title" v-if="comment.from.admin">{{comment.from.admin.name}}</td>
                        <td class="title" v-else>{{comment.from.user.name}}</td>
                        <td class="title">{{comment.content}}</td>
                        <td class="title">
                            <template v-if="comment.state == 0">正常</template>
                            <template v-if="comment.state == -1">已删除</template>
                            <template v-if="comment.state == 1">待审核</template>
                        </td>
                        <td class="t">

                            <y-popconfirm
                                title="是否删除该文章？"
                                :ok-cbk="del.bind(this, comment._id)"
                            >
                                 <y-button type="ghost" color="red" slot="html">删除</y-button>
                            </y-popconfirm>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="none" v-else>还没有标签~ <router-link to="/admin/add/type">添加一个标签</router-link></p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            data:[]
        }
    },
    created(){
        this.$store.dispatch("getComment")
        .then(data=>{
            this.data = data
        })
    },
    methods:{
        del(id){
            this.$http.delete(`/api/comment/${id}`)
            .then(response=>{
                console.log(response)
            })
        }
    }
}
</script>