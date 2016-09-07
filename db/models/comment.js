var mongoose = require("../db");
var Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

var commentSchema = Schema ({
    /* 谁评论 */
    from : {
        required : true,
        type : ObjectId ,
        ref : "User"
    },
    /* 评论谁*/
    reply:[
        {	
        	from:{
        		type:ObjectId,ref:'User'
        	},
         	to:{
		        type:ObjectId,ref:'User'
	        },
	        content:String,
        }
	],
    /* 评论什么 */
    article : {
        required : true,
        type: ObjectId,
        ref:"article"
    },
    /* 内容 */
    content : {
        type : String,
        default : ''
    },
    /* 评论时间 */
    careat_at : {
        type : Date,
        default : Date.now
    }
    
})