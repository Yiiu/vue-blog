// 截断 去除html标签
String.prototype.trims = function(lengths){
    var data = this.replace(/<[^>]+>/g,"");
    if(data.length >lengths){
        return me = data.substring(0,lengths)+"...";
    }else {
        return data;
    }
}
// 截取img标签的src，假如文章没有img那就返回false 否则返回src
function imgs(str){
    var reg = /<img[^>]*src[=\'\"\s]+([^\"\']*)[\"\']?[^>]*>/gi;
    var arr = [];
    while (reg.exec(str)) {
        arr.push(RegExp.$1);
    }
    if(arr.length == 0){
        return false;
    }else {
        return arr[0];
    }
}
// 格式化日期
function day(){
    var data = new Date();
    var me = [];
    var month = data.getMonth()+1;
    var Minutes = data.getMinutes().toString();
    var Hours = data.getHours().toString();
    var Seconds = data.getSeconds().toString();
    if(Minutes <=9){
        Minutes = "0"+Minutes;
    }
    if(Hours <=9){
        Hours = "0"+Hours;
    }
    if(Seconds <=9){
        Seconds = "0"+Seconds;
    }
    me[0] = data.getFullYear()+"年"+month+"月"+data.getDay()+"日";
    me[1] = Hours+":"+Minutes+":"+Seconds
    return me
}
