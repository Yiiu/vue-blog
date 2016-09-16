<template>
    <slot></slot>
    <div class="popover-box" v-el:pop>
        <div class="popover-content">
            <div class="popover-delta">
            </div>
            <div class="popover-title">
                你好~~~
            </div>
            <div class="popover-text">
                adasfasdfadasfasdfadasfasdfadasfasdfadasfasdf
            </div>
        </div>
    </div>
</template>
<script>
export default {
    ready:function(){
        console.log(this.$el.nextElementSibling)
        document.body.appendChild(this.$els.pop)
    }
}
</script>
<style lang="less">
@import "./popover";
</style>