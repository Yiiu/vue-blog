"use strict";
var qiniu = require("qiniu");

module.exports = function(Path){


  //需要填写你的 Access Key 和 Secret Key
  qiniu.conf.ACCESS_KEY = 's7VsqN9lIEMdpA1yIlpMx3xdw-HabAJ8va3c61xs';
  qiniu.conf.SECRET_KEY = 'X68gki8PWV1dO81sCimPU80uL8Mc2chHSfdb6-RM';

  //要上传的空间
  bucket = 'yu7er';

  //上传到七牛后保存的文件名
  key = 'my-nodejs-logo.png';

  //构建上传策略函数
  function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    return putPolicy.token();
  }

  //生成上传 Token
  token = uptoken(bucket, key);

  //要上传文件的本地路径
  filePath = Path

  //构造上传函数
  function uploadFile(uptoken, key, localFile) {
    var extra = new qiniu.io.PutExtra();
      qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
        if(!err) {
          // 上传成功， 处理返回值
          console.log(ret.hash, ret.key, ret.persistentId);       
        } else {
          // 上传失败， 处理返回代码
          console.log(err);
        }
    });
  }

  //调用uploadFile上传
  uploadFile(token, key, filePath);

}