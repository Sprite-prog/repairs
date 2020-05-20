var App = getApp()
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');

Page({
  data: {
    index: 0,
    currentTab: 0,
    postid:0,
    haverecord: true,
    canmodify: false,
    winWidth: 0,
    winHeight: 0,
    hiddenName: false,
    typeid:1,
    shenQinginfo:[],
    fujian:'',
    othernew:'',
    username:'bird.han',
    requester: '', //申请人
    fujian: '', //附件
    othernew: '', //备注的其他信息
    path: '',
    filename: '',
    typeName: '请选择您需要的服务类别',
    pic_array:[],
    picker_hx:0,
    posts_key: [],
    lists_data: [],
    offset: -1, // 偏移量
    get_num: 5, // 每次获取数据得数量
  CurStatus:1,
  },

  checkIsHaveRecord: function () {
    wx.showToast({
      title: '申请单详情获取中...',
      icon: 'loading',
      duration: 1000,
    });
    var that = this;
    const data = {
      //获取新闻公告来源的部门编号，用于调取API新闻列表传参使用
      userName: App.WxService.getStorageSync('bird.han')
    };
  },
  checkIsCanModifyRecord: function () {
    var that = this;
    const data = {
      //获取新闻公告来源的部门编号，用于调取API新闻列表传参使用
      userName: App.WxService.getStorageSync('bird.han')
    };
    api.itserviceModule.canModifyshenQinginfo(data, (state, res) => {
      if (state === 'success') {
        console.log(res);
        if (res.data.StatusCode == 1000) {
          that.setData({
            canmodify: true
          })
        }
        else {
          that.setData({
            canmodify: false
          })
        }
      }
    });
  },
  initshenQinginfo: function (postid) {
    var that = this;
    var userName = 'bird.han';
    var appID = postid;
    const data = {
      //获取新闻公告来源的部门编号，用于调取API新闻列表传参使用
      // userName: App.WxService.getStorageSync('username'),
      appID: appID,
      userName: userName
    };
    api.itserviceModule.getshenQinginfo(data, (state, res) => {
      if (state === 'success') {
        console.log(res);
        if (res.data.StatusCode == 1000) {
          that.setData({
            shenQinginfo: res.data.Data,
          });

        }
      }
    });
  },

  switchNav: function (e) {
    var id = e.currentTarget.id;
    this.setData({
      currentTab: id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    //检查是否已有记录
    this.checkIsHaveRecord();
    var self = this;
    var postId = e.id;
    console.log('这是第几个' + postId)
    var userName = 'bird.han';
    console.log(userName)
    this.initshenQinginfo(postId)
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        self.setData({ winWidth: res.windowWidth });
        self.setData({ winHeight: res.windowHeight });
      },
    })
  },

})