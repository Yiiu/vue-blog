<template lang="html">
    <header class="admin">
        <a class="logo"  v-link="'/admin'">
            W
        </a>
    </header>
</template>

<style lang="less">
header.admin {
    position: fixed;
    width: 100%;
    border-bottom: 1px #e1e1e1 solid;
    height: 65px;
    line-height: 65px;
    padding-left: 25px;
    z-index: 999;
    background: #fff;
    top: 0;
    left: 70px;
    width: 100%;
    border-bottom: 1px #ccc solid;
    height: 65px;
    line-height: 65px;
    padding-left: 25px;
    >.logo {
        font-size: 32px;
        font-weight: 700;
    }
}
</style>
