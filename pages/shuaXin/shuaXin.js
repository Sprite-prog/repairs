// pages/contract/contract.js
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
var app = getApp()
const api = require('../../utils/api.js');
var url = "http://www.imooc.com/course/ajaxlist";
var page = 0;
var page_size = 3;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;

var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url: url,
    data: {
      page: page,
      page_size: page_size,
      sort: sort,
      is_easy: is_easy,
      lange_id: lange_id,
      pos_id: pos_id,
      unlearn: unlearn
    },
    success: function (res) {
      //console.info(that.data.list);
      var list = that.data.list;
      for (var i = 0; i < res.data.list.length; i++) {
        list.push(res.data.list[i]);
      }
      that.setData({
        list: list
      });
      page++;
      that.setData({
        hidden: true
      });
    }
  });
}
Page({
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    shenpi: true,
    biaoti: '',
    time: '',
    state: '',
    list: [],
    hidden: true,
    scrollTop: 0,
    navigationBarHeight

  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  shenpi: function () {
    this.setData({
      shenpi: true
    });
  },
  over: function () {
    this.setData({
      shenpi: false
    });
  },
  goJiejue_1: function () {
    wx.navigateTo({
      url: '/pages/sqliebiao/sqliebiao_yiJiejue',
    })
  },
  onShow: function () {
    var that = this;
    GetList(that);
  },
  bindDownLoad: function () {
    var that = this;
    GetList(that);
  },
  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function (event) {
    page = 0;
    this.setData({
      list: [],
      scrollTop: 0
    });
    GetList(this)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var posts_content = [
      {
        biaoti: '邮箱重置',
        time: '2020-02-28',
        state: '解决中'
      },
      {
        biaoti: '邮箱重置',
        time: '2020-02-28',
        state: '解决中'
      },
      {
        biaoti: '标题：邮箱重置',
        time: '时间：2020-02-28',
        state: '状态：解决中'
      },
      {
        biaoti: '标题：邮箱重置',
        time: '时间：2020-02-28',
        state: '状态：解决中'
      },
      {
        biaoti: '邮箱重置',
        time: '2020-02-28',
        state: '解决中'
      },
      {
        biaoti: '邮箱重置',
        time: '2020-02-28',
        state: '解决中'
      }

    ]
    this.setData({
      list: posts_content
    })
    console.log('onload')
  },
  goback: function () {
    wx.reLaunch({
      url: '../index/index',
    });
    this.clearCache();//清本页缓存
    this.posts_key(0);//第一次加载数据
  },

  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})