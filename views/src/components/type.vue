<template>
    <div class="type-article container">
        <div class="title">
            <h2 class="name">{{name}}</h2>
            <p class="content" v-if="content">{{content}}</p>
        </div>
        <article class="t-4">
            <ul v-if="articles.length !== 0">
                <router-link :to="`/article/${article._id}`" tag="li" v-for="article in articles">
                    <p class="time">{{article.create_time[0]}}</p>
                    <p class="name">{{article.title}}</p>
                </router-link>
            </ul>
            <p class="title" v-else>
                没有文章
            </p>
        </article>
    </div>
</template>
<script>
export default {
    props:{
        name: String,
        content: String,
        articles: Array,
    }
}
</script>

<style lang="less">
.type-article {
    margin-top: 84px;
    >.title {
        text-align: center;
        margin-bottom: 36px;
        .name {
            font-size: 32px;
            color: fade(#000, 70%);
        }
        .content {
            font-size: 18px;
            color: fade(#000, 60%);
        }
    }
    article.t-4 {
        display: flex;
        >p.title {
            width: 100%;
            font-size: 24px;
        }
        ul {
            position: relative;
            width: 100%;
            padding: 12px 0;
            padding-left: 12px;
            &:after {
                content:"";
                top: 0;
                left: 0;
                position: absolute;
                height: 100%;
                width: 2px;
                background: #e2e2e2;
                z-index: 1;
            }
            li {
                cursor: pointer;
                padding: 12px 0;
                padding-left: 22px;
                position: relative;
                border-bottom: 1px #ccc dashed;
                &:after {
                    position: absolute;
                    top: 50%;
                    margin-top: -6px;
                    left: -15px;
                    content: "";
                    width: 8px;
                    height: 8px;
                    border-radius: 100%;
                    background: #bfbfbf;
                    z-index: 5;
                }
                .time {
                    font-size: 14px;
                    color: fade(#000, 60%);
                }
                .name {
                    font-size: 22px;
                    color: fade(#000, 80%);
                    a {
                        text-decoration: none;
                        color: fade(#000, 80%);
                    }
                }
            }
        }
    }
}
</style>