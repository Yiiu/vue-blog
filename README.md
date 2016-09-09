# vue-blog

vue+vue-router+express+mongoose制作的简单博客程序（自用）

===

### 暂时尚未完成（慎用）

/logon 注册

/login 登陆

/admin/add 添加文章

/admin/article:id 修改文章

/admin/addtype 添加标签

ps:tag在添加文章时会自动添加，删除文章时加入tag没有别的文章的话会自动删除。


简单的个人博客程序，暂时完成了一下功能：

- [x] admin登录
- [x] 文章发布
- [x] 文章浏览
- [x] 文章修改删除
- [x] 文章批量删除
- [x] 查找文章
- [x] markdown
- [x] 代码高亮
- [x] 文章标签、分类

待完成功能：

- [ ] 增加文章分类及管理
- [ ] 增加图片上传
- [ ] 增加较为完善的Markdown富文本编辑器
- [ ] 增加专门的图片浏览页面
- [ ] 增加互动性（待考虑）
- [ ] 改为本地评论
- [ ] 完善前端细节
- [ ] 加入vuex

### 安装：
node4.x:

> npm install

> npm run build

> node --harmony_destructuring app.js


node6.x:

> npm install

> npm run build

> node app.js

### 2016-9-7更新
使用co和thunkify重构了一下后端，还有不足的地方欢迎指教~
* 后台api基本完成，完善以后重构下前端。

### 2016-8-6更新
更改了多说样式

### 2016-8-７更新
精简，统一了首页和文章的样式，下一步做弹窗模块何图片模块。

### 2016-8-13更新
分离了一些文件，更好维护，改用了marked，用了highlight来做代码高亮，微调了一些样式。
ps:本想用jwt做登陆状态，想想还是算了，，，，

# demo

![tu](http://yu7er.qiniudn.com/2016-08-07%2016-24-21%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)


![tu](http://yu7er.qiniudn.com/2016-08-07%2016-21-41%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)


![tu](http://yu7er.qiniudn.com/2016-08-07%2016-22-48%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)


![tu](http://yu7er.qiniudn.com/2016-08-07%2016-20-31%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

# 未完待续。。。。
