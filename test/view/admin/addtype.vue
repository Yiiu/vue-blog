<template>
    <div>
        <input type="text" v-model="name">
        <input type="text" v-model="profile">
        <button @click="addtype"></button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            name:"",
            profile:"",
        }
    },
    methods:{
        addtype: function(){
            this.$http.post("/admin/addtype",{
                name:this.name,
                profile:this.profile
            }).then((response) =>{
                console.log(response.data)
            })
        }
    }
}
</script>