<template>
    <div class="dropdown">
        <ul>
            <li v-for="i in data" @click="clk($index)" :class="{'info':value == data[$index] }">
                <span>{{i}}</span>
            </li>
            <li @click="clk(-1)">{{default}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    props:{
        data:Array,
        value:{
            type:String,
            default:""
        },
        default:String
    },
    ready:function(){
        let that = this;
    },
    methods:{
        clk: function(index){
            if(index == -1){
                this.value = this.default;
                this.$dispatch('on', false)
            }else {
                this.value = this.data[index];
                this.$dispatch('on', false)
            }
        }
    }
}
</script>