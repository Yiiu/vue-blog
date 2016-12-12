"use strict";
module.exports = {
    trimsHTML:function(html, lengths){
        var data = html.replace(/<[^>]+>/g,"");
        if(data.length >lengths){
            return data.substring(0,lengths)+"...";
        }else {
            return data;
        }
    },
}