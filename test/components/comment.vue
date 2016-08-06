<template>
    <div class="comment">
        <h2>评论区</h2>
        <div class="form">
            <input type="text" class="y block col-3" placeholder="昵称：">
            <input type="text" class="y block col-3" placeholder="邮箱：">
            <input type="text" class="y block col-3" placeholder="博客：">
            <textarea name="" id="" cols="30" rows="5" class="y block  col-3"></textarea>
            <button class="btn btn-blue ">评论</button>
        </div>
    </div>
</template>
<style lang="less">
.comment .form {
    input {
        font-size: 18px;
        line-height: 24px;
    }
}
</style>