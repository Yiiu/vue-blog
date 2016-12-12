<template>
    <div class="type-article container">
        <types
            :name="data.name"
            :content="data.profile"
            :articles="data.article"
            v-if="loading"
        >
        </types>
        <p></p>
    </div>
</template>
<script>
import types from "../../../components/type"
export default {
    data(){
        return {
            data:{},
            loading:false,
        }
    },
    created(){
        this.$store.dispatch("getTypeArticle",this.$route.params.alias)
        .then(data=>{
            document.title = `${this.$config.title} - ${data.name}`
            this.data = data
            this.loading = true
        })
        .catch(e=>{
            this.$router.push("/404")
        })
    },
    components:{
        types
    }
}
</script>