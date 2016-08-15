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
    z-index: 999;
    background: #fff;
    top: 0;
    padding-left: 15px;
    >.logo {
        font-size: 32px;
        font-weight: 700;
    }
}
</style>
