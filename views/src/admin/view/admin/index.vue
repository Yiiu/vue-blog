<template>
    <div class="admin-index admin-content main">
        <h2 class="title">首页</h2>
        <div class="infos">
            <router-link :to="datas.path" tag="div" class="box"v-for="datas in info">
                <div class="content">
                    <div class="ion">
                        <i :class="datas.ion"></i>
                    </div>
                    <div class="info">
                        <p>{{ datas.name }}</p>
                        <h3 class="num">{{ datas.num }}</h3>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
const info = [
    {
        name:"文章",
        path:"/article",
        ion:"ion-ios-list-outline",
        num:0,
    },
    {
        name:"分类",
        path:"/type",
        ion:"ion-ios-albums-outline",
        num:0,
    },
    {
        name:"标签",
        path:"/tag",
        ion:"ion-ios-pricetags-outline",
        num:0,
    },
    {
        name:"评论",
        path:"/comment",
        ion:"ion-ios-chatbubble-outline",
        num:0,
    },

]
export default {
    data(){
        return {
            info:info
        }
    },
    created(){
        this.$http.get("/api/article?type=length")
        .then(response=>{
            this.info[0].num = response.data.data
        })
        this.$http.get("/api/type?type=length")
        .then(response=>{
            this.info[1].num = response.data.data
        })
    }
}
</script>
<style lang="less">
.admin-main {
    h2.title {
        font-size: 22px;
        font-weight: 400;
    }
    .new {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 880px;
        margin: 0 auto;
        .box {
            width: 33.33333%;
            padding: 12px;
            .content {
                display: flex;
                align-items: center;
                padding: 0;
                .info {
                    h3 {
                        margin: 0;
                        font-weight: 400;
                        font-size: 32px;
                        span {
                            font-size: 16px;
                        }
                    }
                }
            }
        }
    }
    .infos {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-left: -12px;
        margin-right: -12px;
        .box {
            min-width: 25%;
            min-height: 100px;
            padding: 12px;
            .content {
                display: flex;
                align-items: center;
                .ion {
                    padding-right: 12px;
                    margin-right: 12px;
                    border-right: 1px solid #e9e9e9;
                    i {
                        font-size: 46px;
                    }
                }
                .info {
                    h3 {
                        margin: 0;
                        font-weight: 400;
                        font-size: 32px;
                        span {
                            font-size: 16px;
                        }
                    }
                }
            }
        }
    }
    @media (max-width: 940px) { 
        .infos {
            .box {
                min-width: 50%;
            }
        }
    }
    @media (max-width: 600px) { 
        .infos {
            .box {
                min-width: 100%;
            }
        }
    }
}
</style>