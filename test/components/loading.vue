<template>
        <div class="tiao" transition="loadings" v-if="loading"></div>
</template>
<script>
import store from '../store/store' ;
export default {
    vuex:{
        getters:{
            loading: state => state.loading,
        }
    }
}
</script>
<style lang="less">
    .tiao {
        position: fixed;
        width: 80%;
        height: 3px;
        background: #000;
        top: 0;
        left: 0;
        margin: 0;
        z-index: 99999;
        animation: loading 2s ease-in-out 0s infinite;
        will-change: auto;
    }
@-webkit-keyframes loading {
    0%{
        transform: translate3d(-100%, 0, 0);
    }
    100%{
        transform: translate3d(200%, 0, 0);
    }
}
.loadings-transition {
  transition: all .5s ease;
}

/* .loadings-enter 定义进入的开始状态 */
/* .loadings-leave 定义离开的结束状态 */
.loadings-enter{
    opacity: 0;
}
.loadings-leave {
    opacity: 0;
    transform: translate3d(200%, 0, 0);
}
</style>