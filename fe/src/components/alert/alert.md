# alert 提示

alert默认是不会自己关闭的，需要设置time值，或者关闭按钮

> alert内容是用slot分发，比较语义化。

|参数 			|说明			    |类型		|可选值	  					  |默认值  				  |
|---------------|-------------------|-----------|-----------------------------|-----------------------|
| type          | alert样式      	| String    | success,info,warning,danger | 无     				  |
| icon   		| 是否显示提示图标  | String    | false   					  | 无     				  |
| time       	| 消失时间      	| Number   	| false   					  | 0(不消失，单位为毫秒) |