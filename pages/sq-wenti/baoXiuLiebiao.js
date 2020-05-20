// pages/sq-wenti/baoXiuLiebiao.js

var App = getApp()
const api = require('../../utils/api.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hiddenNamepc: true, //pc故障隐藏
    hiddenName: true, //email故障隐藏
    // typeid:2
  },
  onLoad: function (options) {
    let type = options.typeid;
    this.setData({
     typeid:type
    })
    // console.log(type)
  },
  // gopc:function(){
  //   wx.redirectTo({
  //     url: '../sq-wenti/sq-wenti?typeid=1',
  //   })
  // },

  // onPostTap: function (event) {
  //   var postId = event.currentTarget.dataset.id;
  //   console.log("on post id is" + postId)
  //   wx.navigateTo({
  //     url: '/pages/sq-wenti/sq-wenti-fill?id=' + postId,
  //   })
  // },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})