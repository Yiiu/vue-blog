<template>
  <div>
      <router-view></router-view>
      <y-Modal></y-Modal>
  </div>
</template>
<style >
#app {
  margin-top: 15px;
  margin-left: 50px;
}
</style>
<script>

import yModal from "./components/modal"

export default {
    ready: function (){
      this.$http.get("/api/index",{ 
          t:0
      }).then((response)=>{
          console.log(response.json())
      })
    },
    components:{
        yModal
    }
}
</script>