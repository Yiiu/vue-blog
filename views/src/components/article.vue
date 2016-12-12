<template>
    <article class="article">
        <template v-if="data.cover != ''">
            <div class="img" v-if="data.full">
                <!--<img :src="data.cover" class="index-img">-->
                <div class="bg-img" :style="{backgroundImage:`url(${data.cover})`}"></div>
                <div class="mask"></div>
                <div class="yuan"></div>
            </div>
            <div class="container" v-else>
                <div class="imgs container">
                    <img :src="data.cover" class="index-img">
                </div>
            </div>
        </template>
        <h2 class="title container p-12">{{ data.title }}</h2>
        <div class="meta container p-12">
            <span>
                <y-tooltips :content="data.time[0]" trigger="hover" theme="dark" placement="bottom">
                    <a href="" slot="html">{{data.time[1]}} </a>
                </y-tooltips>
                <template v-if="data.type">
                    • 
                    <router-link :to="`/type/${data.type.alias}`">{{data.type.name}}</router-link>
                </template>
            </span>
        </div>
        <div class="md container p-12" ref="md" v-html="data.content"></div>
    </article>
</template>
<script>
export default {
    props:{
        data:Object
    },
}
</script>
<style lang="less">
article.article {
    .img {
        position: relative;
        margin-bottom: 24px;
        overflow: hidden;
        max-height: 400px;
        z-index: -2;
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
    .imgs {
        margin-bottom: 24px;
        padding-top: 40px;
    }
    h2.title {
        text-align: center;
        margin-bottom: 12px;
        font-size: 42px;
    }
    .meta {
        margin-bottom: 24px;
        text-align: center;
        a {
            color: #999;
            text-decoration: none;
        }
    }
    .md {
        margin-bottom: 62px;
        padding-top: 1px;
        * {
            font-size: 16px;
            text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1);
        }
        font-size: 16px;
        h1,h2,h3,h4,h5,h6 {
            font-weight: 400;
            margin: 0;
            margin-bottom: 12px !important;
        }
        h1 {
            font-size: 34px;
            padding: 0;
            margin: 0;
            margin-top: 24px;
        }
        h2 {
            font-size: 26px;
            margin-top: 24px;
        }
        h3,h4,h5 {
            font-size: 22px;
            margin-top: 24px;
        }
        h6 {
            margin-top: 24px;
            font-size: 20px;
        }
        ol {
            list-style-type: decimal;
            padding-left: 24px;
        }
        hr {
            display: block;
            border: none;
            background: #e7e7e7 repeating-linear-gradient(-45deg,#fff,#fff .25rem,transparent .25rem,transparent .5rem);
        }
        p {
            margin: 0;
            margin-bottom: 18px;
            font-size: 16px;
            line-height: 1.6;
        }
        pre {
            background-color: fade(#000, 2%);
            padding: 12px;
            font-size: 16px;
            line-height: 22px;
            margin-bottom: 18px;
        }
        img {
            display: block;
            transition: 0.3s all;
        }
        img.emoji {
            display: inline-block;
            height: 1.2em;
            vertical-align: sub;
            width: auto;
            margin: 0;
        }
        table{
            font-size: 16px;
            border:1px solid #e9e9e9
        }
        table thead{
            background:#f7f7f7
        }
        table thead tr{
            border-bottom:1px solid #e9e9e9
        }
        table thead tr th{
            padding: 6px 4px;
            border-left:1px solid #e9e9e9
        }
        table tbody tr{
            border-bottom:1px solid #e9e9e9
        }
        table tbody tr td{
            padding:12px 18px;
            border-left:1px solid #e9e9e9
        }
        img {
            width: 106%;
            margin-left: -3%;
            transform-origin: 50% 25%;
            max-width: 100%;
            max-height: 650px;
            &.opens-mask {
                position: relative;
                z-index: 9999;
                cursor: zoom-out;
            }
        }
        blockquote {
            padding: 24px 20px;
            margin: 0 0 20px;
            font-size: 17.5px;
            border-left: 5px solid #eee;
            p {
                color: fade(#000, 60%);
                padding: 0;
                margin: 0;
            }
        }
        code {
            background-color: fade(#000, 4%);
            padding: 2px 4px;
            border-radius: 2px;
            font-size: 90%;
            color: fade(#000, 70%);
        }
        pre code {
            padding: 0;
            font-size: inherit;
            color: inherit;
            white-space: pre-wrap;
            background-color: transparent;
            border-radius: 0;
        }
    }
    .tag {
        margin-top: 24px;
        margin-bottom: 24px;
        .tag-list {
            line-height: 22px;
            display: inline-block;
            padding: 4px 12px;
            background: fade(#000, 5%);
            color: fade(#000, 50%);
            margin-right: 12px;
            border-radius: 22px;
        }
    }
}
</style>