<template>
    <div class="tag">
        <label>
            <span v-for="data in tags"
                @mouseover="delClass($index, 't')"
                @mouseout="delClass($index, 's')"
                @click="delTag($index)"
            >{{data}}</span>
            <input type="text"  placeholder="标签" 
                @keyup.enter="submit"
                @keyup.space="submit"
                @keyCodes.dou="submit"
                v-model="text"
            >
        </label>
    </div>
</template>
<script>
export default {
    data(){
        return {
            text:"",
            delClassB:false,
        }
    },
    props:{
        tags:{
            twoWay:true,
            type:Array
        },
    },
    methods: {
        submit: function(e){
            if(this.tags.length == 5 || this.tags.length >= 5){
                return false
            }else {
                if(this.text.indexOf(" ") > 0){
                    this.tags.push(this.text.replace(/(^\s*)|(\s*$)/g,''));
                    this.text = "";
                    this.tags = this.tags.isOr(); 
                }else {
                    this.tags.push(this.text);
                    this.text = "";
                    this.tags = this.tags.isOr(); 
                }
            }
        },
        delTag: function(index) {
            console.log(index)
        },
        delClass: function(index, inst){
            if(inst == "t"){
                this.$el.getElementsByTagName("span")[index].className = "del";
            }else {
                this.$el.getElementsByTagName("span")[index].className = "";
            }
        },
        delTag: function(index) {
            this.tags.splice(index,1)
        }
    }
}

Array.prototype.isOr = function(){
    var n = []; //一个新的临时数组
    for(var i = 0; i < this.length; i++){
        if (n.indexOf(this[i]) == -1) {
            n.push(this[i]);
        }
    }
    return n;
}
</script>
<style lang="less">
.tag {
    box-sizing: border-box;
    border-radius: 4px;
    border: 2px solid #d2d2d2;
    font-size: 34px;
    color: #515151;
    outline: 0;
    margin-bottom: 15px;
    -webkit-transition: all .1s ease-in;
    transition: all .1s ease-in;
    label {
        width: 100%;
        display: inline-block;
        height: 54px;
        line-height: 54px;
        padding-left: 15px;
    }
    input{
        border: 0;
        font-size: 24px;
        height: 34px;
        line-height: 34px;
        width: 150px;

        &:focus {
            outline:none;
        }
    }
    span {
        transition: 0.3s all;
        display: inline-block;
        padding: 4px 7px;
        box-sizing: border-box;
        margin-bottom: 2px;
        font-size: 24px;
        background: #b6ddff;
        line-height: 28px;
        vertical-align: middle;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 10px;
        &.del {
            background: #ff8282;
            color: #fff;
        }
    }
}
</style>