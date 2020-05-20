// component/uploader/uploader.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    files: [],
    show:false,
    current:'',
    currentFiles: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
      // wx.previewImage({
      //   current: e.currentTarget.id, // 当前显示图片的http链接
      //   urls: this.data.files // 需要预览的图片http链接列表
      // });
      console.log(e);
      let current = e.currentTarget.dataset.index;
      console.log(current);
      this.setData({
        show:true,
        current:current
      })
    },
    delete(e){
      const index = e.detail.index;
      const files = this.data.files;
      const file = files.splice(index, 1);
      this.setData({
        files,
        currentFiles: files
      })
      console.log(this.data.files)
    }
  }
})
