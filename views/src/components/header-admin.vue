<template>
    <header class="admin">
        <nav>
            <a :href="config.path" class="logo" exact>W</a>
            <router-link 
                :to="info.path" 
                v-for="info in nav" 
                exact
            >
                <i :class="info.icon"></i>
            </router-link>
        </nav>
        <div class="admin">
        <y-tooltips theme="white"  trigger="hover" placement="bottom-right">
            <a slot="html">
                <i class="ion-ios-plus-empty admin"></i>
            </a>
            <div slot="content" class="add">
                <router-link to="/add/article" tag="div">文章</router-link>
                <router-link to="/add/type" tag="div">标签</router-link>
            </div>>
        </y-tooltips>
        </div>
    </header>
</template>
<script>
const nav = [
    {
        path:"/",
        icon:"ion-ios-home-outline"
    },
    {
        path:"/article",
        icon:"ion-ios-list-outline"
    },
    {
        path:"/type",
        icon:"ion-ios-pricetag-outline"
    },
    {
        path:"/comment",
        icon:"ion-ios-chatbubble-outline"
    },
    {
        path:"/setting",
        icon:"ion-ios-gear-outline"
    },
]
export default {
    data(){
        return {
            nav:nav,
        }
    },
    computed:{
        config:function(){
            return this.$config
        }
    }
}
</script>
<style lang="less">
.y-tooltips-box {
    .add {
        width: 150px;
        div {
            cursor: pointer;
            padding: 6px 0;
        }
    }
}
header.admin {
    display: flex;
    height: 60px;
    width: 100%;
    border: 1px solid #efefef;
    nav,.admin{
        display: flex;
        justify-content: center;
        align-items: center;
        a {
            transition: .3s all;
            display: block;
            width: 60px;
            height: 60px;
            min-height: 60px;
            line-height: 60px;
            text-align: center;
            font-size: 32px;
            color: #666;
            text-decoration: none;
            opacity: .8;
            &:hover {
                opacity: 1;
            }
            &.router-link-active {
                opacity: 1;
                background: #eaeaea;
            }
        }   
    }
    >.admin {
        position: absolute;
        right: 0;
        a {
            display: flex;
            justify-content: center;
            align-items: center;
            i {
                font-size: 38px;
            }
        }
    }
}

@media (max-width: 940px) {
}
@media (max-width: 600px) {
}
</style>