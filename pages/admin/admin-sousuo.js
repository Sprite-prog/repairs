var App = getApp()
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');
const formatTime = util.formatTime;
var postsData = require('../../data/posts_data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarTitle: '选择人员',
    userList: [],
    hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var AppID = options.currentTarent.dataset.id;

    console.log(AppID)
    //在这传问题的id
  },
  bindChangeUser: function (e) { //绑定返回的页面
    var userName = e.currentTarget.dataset.username;
    const type = e.currentTarget.dataset.type
    const id = e.currentTarget.dataset.id
    const assignUserName = 'bird.han';
    console.log(assignUserName)
    //绑定部门编号
    this.setData({
      deptID: type,
    });
    wx.request({
      url: 'https://wxoaminiapps-qa.lshmnc.com.cn/api/ITService/AssignApplicationInfo',
      data: {
        assignUserName: assignUserName,
        appID: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
    wx.showModal({
      title: '提示',
      content: '请确认分配给' + userName,
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../admin/admin',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }

      }
    })


    //写模态框 确认分配给谁吗？？

    // var fn = App.globalData.userFn;
    // var type = this.type;
    // if (typeof fn == 'function') {
    //   setTimeout(function () {
    //     fn(userName);
    //     App.globalData.userFn = null;
    //   }, 0)
    //   wx.navigateBack({
    //     delta: 1
    //   });
    // }
  },
  getUserInfo: function (e) {
    var self = this;
    self.setData({
      hidden: false
    })
    var keyword = e.detail.value;
    console.log(keyword);
    const data = {
      top: 10,
      keyword: keyword
    };
    api.userinfo.search(data, (state, res) => {
      if (state === 'success') {
        console.log(res);
        self.setData({
          userList: res.data.Data,
          hidden: true
        })
      }
    });
  },
  returnPreStep: function () {
    wx.navigateBack({
      delta: 1 // 返回上一级页面
    })
  },

})