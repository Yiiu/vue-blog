<template>
    <div>1</div>
</template>
<script>
export default {
    created(){
        this.$store.dispatch("logout")
        .then(e=>{
            this.$notify("登出成功")
            this.$router.push("/login")
        })
    }
}
</script>