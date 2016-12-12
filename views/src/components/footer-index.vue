<template>
    <footer class="index-footer">
        <p class="t">{{data}}</p>
        <p class="info">
            <!--<span>闽ICP备16015509号</span>-->
        </p>
    </footer>
</template>
<script>
const data = [
    "夜，天花板有这段戏，总关不上心里的放映机。",
    "我就是我，是颜色不一样的烟火。",
    "我们拥抱着就能取暖，我们依偎着就能生存。",
    "别留恋岁月中我无意的柔情万种，别问我是否言不由衷。",
]
export default {
    computed:{
        data:function(){
            let n = Math.random() * data.length
            return data[parseInt(n)]
        }
    }
}
</script>
<style lang="less">
footer.index-footer {
    p.t {
        transition: .3s all;
        padding: 82px 24px;
        text-align: center;
        font-size: 4vw;
    }
    p.info {
        text-align: right;
        color: #939393;
    }
}

@media (max-width: 600px) {
    footer.index-footer {
        p.t {
            font-size: 26px !important;
        }
    }
}
@media (max-width: 940px) {
    footer.index-footer {
        p.t {
            font-size: 42px ;
        }
    }
}
</style>