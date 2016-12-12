<template>
    <article class="index">
        <h1 class="title y"><router-link :to="path">{{ data.title }}</router-link></h1>
        <div class="meta">
            <span>
                <a href="" slot="html">{{data.time[1]}} </a>
            </span>
        </div>
        <router-link :to="path" v-if="data.cover" class="img-a">
            <div class="imgs">
                <img :src="data.cover" class="index-img">
            </div>
        </router-link>
        <p class="outline p-12">
            {{data.content}}
        </p>
    </article>
</template>
<script>
export default {
    props:{
        path:String,
        data:Object,
    },
}
</script>
<style lang="less">
article.index {
    padding-top:64px;
    margin-bottom: 62px;
    h1.title {
        font-size: 42px;
        margin-bottom: 6px;
        text-align: center;
        a {
            color: #404040;
            text-decoration: none;
        }
    }
    .imgs {
        position: relative;
        margin-top: 12px;
        margin-bottom: 24px;
        overflow: hidden;
        .mask {
            transition: all .3s cubic-bezier(.645,.045,.355,1);
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: fade(#fff, 50%);
            display: flex;
            justify-content: center;
            align-items: center;
            a {
                transition: all .3s cubic-bezier(.645,.045,.355,1);
                font-size: 22px;
                color: #686868;
                text-decoration: none;
                transform: translate3d(0, 32px, 0);
                padding: 4px 12px;
            }
        }
    }
    p.outline {
        color: #878787;
        margin-bottom: 12px;
        font-size: 16px;
        line-height: 1.6;
    }
    p.read-all {
        margin-left: 6px;
        font-size: 20px;
        text-align: center;
        margin: 12px 0;
        a {
            text-decoration: none;
            color: #ccc;
        }
    }
    div.meta {
        color: #666;
        font-size: 16px;
        margin-bottom: 24px;
        text-align: center;
        a {
            color: #999;
            text-decoration: none;
        }
    }
}
</style>