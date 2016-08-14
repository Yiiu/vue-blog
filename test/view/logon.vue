<template lang="">
    <div class="logon">
        <input type="text" v-model="name">
        <input type="password" v-model="password">
        <input type="text" v-model="email">
        <button type="button" name="button" @click="go">注册</button>
    </div>
</template>
<script>
export default {
    data() {
    return {
        name:"",
        password:"",
        email:""
    };
    },
    computed: {},
    ready() {},
    attached() {},
    methods: {
        go:function(){
            this.$http.post("/logon", {
                name:this.name,
                password:this.password,
                email:this.email
            }).then((response) =>{
                console.log(response);
            })
        }
    },
    components: {}
};
</script>

<style lang="css">
</style>
