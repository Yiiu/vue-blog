<template>
    <p class="animated loading" v-if="!loadings" transition="loadings">loading...</p>
</template>
<script>
export default {
    props:["loadings"]
}
</script>
<style lang="less">
.loading {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 0;
    margin: -23px 0 0 -100px;
    width: 200px;
    text-align: center;
    font-size: 42px;
    line-height: 46px;
    color:#5c9ed8;
    -webkit-animation: loading 1.5s infinite ease-in-out;
    animation: loading 1.5s infinite ease-in-out;
}
@-webkit-keyframes loading {
    0%{
        opacity: 1;
    }50%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
.loadings-transition {
  transition: all .3s ease;
}

/* .loadings-enter 定义进入的开始状态 */
/* .loadings-leave 定义离开的结束状态 */
.loadings-enter, {
    transform: scale(0);
    opacity: 0;
}
.loadings-leave {
    transform: scale(0);
    opacity: 0;
}
</style>