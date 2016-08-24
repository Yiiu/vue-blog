<template>
    <div class="wrapper">
        <h1>按钮：</h1>
        <button class="btn btn-default">你好！！</button>
        <button class="btn btn-danger">危险！！</button>
        <button class="btn btn-primary">很好！！</button>
        <button class="btn btn-info">一般般！</button>
        <button class="btn btn-warning">危险！！</button>
        <h1>色块：</h1>
        <div class="box default">
            <p>默认灰色</p>
            <p>#efefef</p>
        </div>
        <div class="box red">
            <p>默认红色</p>
            <p>#ffc4c4</p>
        </div>
        <div class="box green">
            <p>默认绿色</p>
            <p>#b8f5c5</p>
        </div>
        <div class="box blue">
            <p>默认蓝色</p>
            <p>#aae5ff</p>
        </div>
        <div class="box yellow">
            <p>默认黄色</p>
            <p>#ffec8c</p>
        </div>
        <h1>文本框</h1>
        <input type="text" class="y">
        <input type="text" class="y red">
        <input type="text" class="y green">
        <input type="text" class="y blue">
        <div>
            <label>
                test:<input type="checkbox" class="y">
            </label>
        </div>
    </div>
</template>
<style lang="less">
@import "../assets/styles/_var.less";
.wrapper {
    width: 1180px;
    margin: 0 auto;
}
.box {
    width: 120px;
    height: 120px;
    border-radius: 15px;
    display: inline-block;
    margin-right: 15px;
    margin-bottom: 15px;
    p {
        text-align: center;
        margin: 5px 0;
    }
}
</style>