<template>
    <div>
    <form name='formFile' method="post" action="/upload">
        <img id="preview" :src="file && url">
        <input type="file" name="photo" @change="preview">
        <input type="submit" value="提交">
    </form>
</template>
<script>
module.exports = {
    data () {
        return {
            $file: null,
            file: null,
            url:null
        }
    },
    ready:function () {
        this.$file = this.$el.querySelector('input[type="file"]');
    },
    methods: {
        preview (e) {
            let file = e.target.files[0];
            let supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
            this.url = URL.createObjectURL(file)
            if (file && supportedTypes.indexOf(file.type) >= 0) {
                this.file = file;
            } else {
                alert('文件格式只支持：jpg、jpeg 和 png');
                this.clearFile();
            }

            console.log(this.url)
        },
        clearFile () {
            this.$file.value = '';
            this.file = null;
        },
        submitFile (e) {
            this.$http.post("/upload",{
                file:this.url
            }).then((response)=>{
                console.log(response)
            })
        }
    }
}
</script>