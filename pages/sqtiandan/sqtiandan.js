// pages/sq-tiandan/sq-tiandan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null,
    requester:'',//申请人
    department:'',//部门
    company:'',//公司
    usernumPc:'',//主机序列号
    namePc:'',//计算机名字
    faildescirption:'',//故障描述
    useremail:'',//被修改的邮箱账号
    phonenum:'',//手机号
    fujian:'', //附件
    othernew:'',//备注的其他信息
    path: '',
    filename: '',
    src: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */


  // 文件上传这里可以是图片音频视频
  // onLoad: function() {
  //   wx.chooseImage({
  //     count: 9,
  //     sizeType: ['original', 'compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function(res) {
  //       var tempFilePaths = res.tempFiles;
  //       wx.uploadFile({
  //         url: '',
  //         filePath: 'tempFilePaths[0]',
  //         name: 'name',
  //         header: {
  //           'content-type': 'Application/json'
  //         },
  //         formData: {
  //           imgName: '我是图片名称',
  //           imgSize: '112kb'
  //         },
  //         success: function(res) {
  //           console.log(res);
  //         }
  //       })
  //     }

  //   })
  // },

//   onLoad: function() {
//     var page = this;
//     wx.downloadFile({
//       url: 'https://wxoaminiapps.lshmnc.com.cn/wechat/joywork/hr/images/bg1@2x.png',
//       type: 'image',
//       success: function(res) {
//         console.log(res);
//         var tempPath = res.tempFilePath;
//         page.setData({
//           src: tempPath
//         });
//       }
//     })
//   }
// },




// //保存文件到本地
// onLoad:function(){
// wx.getImageInfo({
//   src: 'https://wxoaminiapps.lshmnc.com.cn/wechat/joywork/hr/images/bg1@2x.png',
//   success:function(res){
//     var path = res.path;
//     console.log("临时文件路径="+path);
//     wx.saveFile({
//       tempFilePath: path,
//       success:function(res){
//         var savedFilePath = res.savedFilepath;
//         console.log("本地文件路径="+savedFilepath);
//       }
//     })
//   }
// })
// },


// //获取本地文件列表
//   onLoad:function(){
//     wx.getSavedFileList({
//       success:function(res){
//         var fileList = res.fileList;
//         console.log(fileList)
//         for(var i=0;i<fileList.length;i++){
//           var file = fileList[i];
//           console.log("第"+(i+1)+"个文件：");
//           console.log("文件创建时间="+file.createTime);
//           console.log("文件大小="+file.size);
//           console.log("文件文本路径="+file.filePath);
//         }
//       }
//     })
//   },



onLoad:function(){
wx.chooseMessageFile({
  count: 1, //能选择文件的数量
  type: 'file', //能选择文件的类型,我这里只允许上传文件.还有视频,图片,或者都可以
  success(res) {
    var size = res.tempFiles[0].size;
    var filename = res.tempFiles[0].filename;
    var newfilename = filename + "";

    if (size > 4194304 || newfilename.indexOf(".pdf") == -1) { //我还限制了文件的大小和具体文件类型
      wx.showToast({
        title: '文件大小不能超过4MB,格式必须为pdf！',
        icon: "none",
        duration: 2000,
        mask: true
      })
    } else {
      that.setData({
        path: res.tempFiles[0].path, //将文件的路径保存在页面的变量上,方便 wx.uploadFile调用
        filename: filename //渲染到wxml方便用户知道自己选择了什么文件
      })
    }
  }
}),



wx.uploadFile({
  url: 'serverUrl', //上传的路径
  filePath: that.data.path, //刚刚在data保存的文件路径
  name: 'file', //后台获取的凭据
  success() {
    wx.showToast({ //做个提示或者别的操作
      title: '上传成功',
      icon: "none",
      duration: 5000,
      mask: true,
      success: function(res) {

      }
    })
  }
})
}

// 打开文档，可以是多种格式的文档
// wx.downloadFile({
//   url: 'https://wxoaminiapps.lshmnc.com.cn/wx0e3dfb2bf4611203/0/word/样本.doc',
//   success: function(res) {
//     var filePath = res.tempFilePath
//     wx.openDocument({
//       filePath: filePath,
//       success: function(res) {
//         console.log('打开文档成功')
//       }
//     })
//   }
// })

})