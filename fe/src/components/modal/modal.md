# modal（全局弹窗）

alert默认是不会自己关闭的，需要设置time值，或者关闭按钮

> alert内容是用slot分发，比较语义化。

## 用法：
1. 在main.js注册：

``` javascript
Vue.use(globalCo, {
    Modal:true
})
```

2. 把组件放在根节点

3. 这样就可以在任何组件使用modal啦

### 使用方法,在任何地方如下调用：
``` javascript
// 调用modal

this.$Modal.init({
    title:"你好",
    content:"tsetestestesetste",
    ok:function(){console.log("test")},
    okBtn:{show: true,type:"primary",text:"确定"},
    backBtn:{show: true,type:"",text:"取消"}
})
// 删除modal，按钮事件会自动触发

this.$Modal.del()

```
## 参数如下：

#this.$Modal.init:

|参数        |说明                  |类型       |可选值 |默认值                                      |
|------------|----------------------|-----------|-------|--------------------------------------------|
| title      | 标题                 | String    | 无    | 无                                         |
| content    | 内容  | String       | String    | 无    | 无                                         |
| ok         | 右按钮点击触发的事件 | Function  | 无    | 无                                         |
| back       | 左按钮点击触发的事件 | Function  | 无    | 无                                         |
| okBtn      | 右按钮选项           | Object    | 无    | { show: true,type:"primary",text:"确定", } |
| backBtn    | 左按钮选项           | Object    | 无    | { show: true,type:"",text:"取消", }        |

# 按钮选项:

|参数   |说明          |类型       |可选值                              |默认值       |
|-------|--------------|-----------|------------------------------------|-------------|
| show  | 是否显示     | Boolean   | primary, success, warning, danger  | 默认空      |
| type  | 样式         | String    | 无                                 | 无          | 
| text  | 内容         | String    | 无                                 | 无          |