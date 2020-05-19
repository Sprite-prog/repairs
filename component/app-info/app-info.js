// component/app-info/app-info.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shenQinginfo:{
      type:Object,
      value:{}
    },
    pic_array:{
      type:Array,
      value:[],
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isShow:false,
    hx_index:'',
    files: [{
      url: 'http://mmbiz.qpic.cn/mmbiz_png/VUIF3v9blLsicfV8ysC76e9fZzWgy8YJ2bQO58p43Lib8ncGXmuyibLY7O3hia8sWv25KCibQb7MbJW3Q7xibNzfRN7A/0',
    }, {
      loading: true
    }, {
      error: true
    }]

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange(event){
      console.log(event);
      const hx_index = event.detail.value;
      const pic_array_title = this.properties.pic_array[hx_index].Title;
      this.setData({
        isShow: true,
        hx_index: event.detail.value,
      })
      this.triggerEvent('picker', { pic_array_title: hx_index});
    },
    input(event){
      let value=event.detail.value;
      this.triggerEvent('intro', { intro: value });
    },
    blur(event) {
      let value = event.detail.value;
      this.triggerEvent('intro', { intro: value });
    },
    chooseImage: function (e) {
      var that = this;
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.setData({
            files: that.data.files.concat(res.tempFilePaths)
          });
        }
      })
    },
    previewImage: function (e) {
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files // 需要预览的图片http链接列表
      })
    },
    selectFile(files) {
      console.log('files', files)
      // 返回false可以阻止某次文件上传
    },
    uplaodFile(files) {
      console.log('upload files', files)
      // 文件上传的函数，返回一个promise
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject('some error')
        }, 1000)
      })
    },
    uploadError(e) {
      console.log('upload error', e.detail)
    },
    uploadSuccess(e) {
      console.log('upload success', e.detail)
    }
  }
})
