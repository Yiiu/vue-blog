<template>
    <div class="add-article" v-if="loading">
        <div class="full" v-if="data.full">
            <!--<img :src="data.cover" class="index-img">-->
            <div class="bg-img" :style="{backgroundImage:`url(${data.cover})`}" @click="coverDiaOn"></div>
            <div class="yuan"></div>
            <div class="shrink" v-if="data.cover != ''" @click="fulls">
                <i class="ion-arrow-shrink"></i>
            </div>
        </div>
        <div class="img container" v-else>
            <img :src="data.cover" class="coverimg" v-if="data.cover != ''"  @click="coverDiaOn">
            <div class="content" v-else @click="coverDiaOn">
                <p>
                <i class="ion-ios-camera-outline"></i>
                </p>
                <p>添加封面</p>
            </div>
            <div class="expand" v-if="data.cover != ''" @click="fulls">
                <i class="ion-arrow-expand"></i>
            </div>
        </div>
        <div class="title container">
            <div class="content">
                <input type="text" placeholder="请输入标题" v-model="data.title">
            </div>
        </div>
        <div class="content container">
            <div class="content">
                <textarea v-model="data.content" placeholder="请输入文章内容"></textarea>
            </div>
        </div>
        <div class="type container">
            <div class="content">
                <p class="title">分类</p>
                <y-select v-model="type" clearable>
                    <y-option :value="type._id" :label="type.name" v-for="type in types">{{type.name}}</y-option>
                </y-select>
            </div>
        </div>
        <div class="tags container">
            <div class="content">
                <transition-group name="y-tag" class="tag" :class="{ none : tag.length == 0}">
                    <y-tag 
                        type="gray" 
                        closable 
                        v-for="(tags, index) in tag" 
                        :close="deltag.bind(this,index)"
                        :key="tags.key"
                    >{{tags.name}}</y-tag>
                </transition-group>
                <input type="text" placeholder="请输入标签，回车添加" @keyup.enter="addtag">
            </div>
        </div>
        <div class="container">
            <y-button type="ghost" @click.native="add" v-if="!$route.params.id">提交</y-button>
            <y-button type="ghost"  @click.native="update" v-else>更新</y-button>
        </div>
        <y-dialog
            v-model="coverBtn"
            title="添加封面"
        >
            <template slot="content" class="test">
                <textarea ref="coverUrl"></textarea>
            </template>
            <template slot="footer">
                <y-button type="ghost" @click.native="coverBtn = false">取消</y-button>
                <y-button type="primary" @click.native="coverDiaOk">确认</y-button>
            </template>
        </y-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return {
            data:{
                title:"",
                content:"",
                cover:"",
                type:{},
                tags:"",
                full:false
            },
            type:"",
            tagKey:0,
            tag:[],
            coverBtn:false,
            loading:false
        }
    },
    created(){
        if(this.$route.params.id){
            this.$http.get(`/api/article/${this.$route.params.id}?md=no`)
            .then(response=>{
                return response.json()
            })
            .then(article=>{
                this.data = article.data
                if(this.data.type) {
                    this.type = this.data.type._id
                }
                // 处理一下原有tag
                this.tag = this.data.tags.map(tag => {
                    this.tagKey++
                    return {key:this.tagKey, name:tag.name}
                })
                this.loading = true
            })
        }else {
            this.loading = true
        }
        // 
        this.$store.dispatch("getType")
    },
    methods:{
        add(){
            if(this.data.title == ""){
                this.$notify("请输入正确的标题")
                return 
            }else if(this.data.content == ""){
                this.$notify("请输入正确的内容")
                return
            }

            let tag = this.tag.map((e)=>{
                return e.name
            })

            this.data.tags = tag

            this.data.type = this.type

            this.$store.dispatch("addArticle", this.data)
            .then(data=>{
                this.$router.push("/")
                this.$notify("文章发布成功")
            })
            .catch(err=>{
                this.$notify.warning("文章发布失败")
            })
        },
        update(){
            if(this.data.title == ""){
                this.$notify("请输入正确的标题")
                return 
            }else if(this.data.content == ""){
                this.$notify("请输入正确的内容")
                return
            }
            
            let tag = this.tag.map((e)=>{
                return e.name
            })

            this.data.tags = tag
            this.data.type = this.type
            this.$store.dispatch("upArticle", {
                article: this.data,
                id: this.$route.params.id
            })
            .then(data=>{
                this.$router.push("/")
                this.$notify("文章更新成功")
            })
            .catch(err=>{
                this.$notify.warning("文章更新失败")
            })
        },
        coverDiaOn(){
            this.coverBtn = true
        },
        coverDiaOk(){
            if(this.coverUrl == "") {
                this.$notify.danger("不能为空")
            }else {
                this.data.cover = this.$refs.coverUrl.value
                this.coverBtn = false
            }
        },
        deltag(i){
            this.tag.splice(i, 1)
        },
        addtag(e){
            if(this.tag.length >= 5) {
                return
            }else {
                this.tagKey++
                this.tag.push({
                    key:this.tagKey,
                    name:e.target.value
                })
                e.target.value = ""
            }
        },
        fulls(){
            this.data.full = !this.data.full
        },
        check(next){
        }
    },
    computed:{
        types:function(){
            return this.$store.state.index.types
        }
    }
}
</script>
<style lang="less">
.add-article {
    .full {
        position: relative;
        margin-bottom: 24px;
        overflow: hidden;
        max-height: 400px;
        .shrink {
            border-radius: 100%;
            padding: 12px;
            background-color:fade(#fff, 60%); 
            width: 40px;
            text-align: center;
            height: 40px;
            line-height: 20px;
            position: absolute;
            bottom: 22px;
            right: 12px;
            i {
                font-size: 18px;
                color: fade(#000, 70%);
            }
        }
        .bg-img {
            width: 102%;
            margin-left: -1%;
            margin-top: -5px;
            height: 400px;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }
        img {
            display: block;
            width: 100%;
        }
        .yuan {
            content: '';
            width: 150%;
            height: 80px;
            background: #fff;
            left: -25%;
            bottom: -60px;
            border-radius: 100%;
            position: absolute;
            z-index: 4;
        }
    }
    .img {
        margin-top: 24px;
        position: relative;
        .expand {
            width: 40px;
            text-align: center;
            height: 40px;
            line-height: 20px;
            position: absolute;
            bottom: 12px;
            right: 12px;
            border-radius: 100%;
            padding: 12px;
            background-color:fade(#fff, 60%); 
            i {
                font-size: 18px;
                color: fade(#000, 70%);
            }
        }
    }
}
</style>
