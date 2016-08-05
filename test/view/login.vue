<template>
    <div class="login col-4-c" transition="op" v-if="loading">
        <span v-if="op=='true'">登录成功</span>
        <span v-if="op=='false'">登录失败</span>
        <label>
            <input type="text" id="name" class="y block" autocomplete="new-password"  v-el:name>
        </label>
        <label>
            <input type="password" class="y block" id="password" autocomplete="new-password"  
                v-el:password
                @keyup.enter="test"
            >
        </label>
        <button @click="test" class="btn btn-default block">on</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            op:"on",
            loading:false,
        }
    },
    methods:{
        test:function(){
            this.$http.post("/login",{
                name:this.$els.name.value,
                password:this.$els.password.value
            }).then((response)=>{
                this.op = response.data.op;
                if(this.op == "true"){
                    window.location.href = "#/admin";
                }
            })
        }
    },
    init: function(){
        this.$http.post("/log",).then((response)=>{
            if(response.data.op == "true"){
                window.location.href = "#/admin";
            }else {
                this.loading = true;
            }
        })
    }
}
</script>
<style lang="less">
.login {
    box-sizing: border-box;
    padding: 35px 45px;
    border: 1px solid #dcdcdc;
    border-radius: 3px;
}
</style>