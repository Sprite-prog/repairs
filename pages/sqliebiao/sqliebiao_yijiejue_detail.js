// function initSubMenuDisplay() {
//   return ['hidden', 'hidden'];
// }
var App = getApp()
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    over: false,
    hiddenName:true,
    // subMenuDispaly: initSubMenuDisplay(),
    currentTab: -1,
    deID:2,
    index: 0,
    currentTab: 0,
    postid: 0,
    haverecord: true,
    canmodify: false,
    winWidth: 0,
    winHeight: 0,
    hiddenName: false,
    typeid: 2,
    shenQinginfo: [],
    fujian: '',
    othernew: '',
    username: 'bird.han',
    requester: '', //申请人
    department: '', //部门
    company: '', //公司
    fujian: '', //附件
    othernew: '', //备注的其他信息
    path: '',
    filename: '',
    typeName: '请选择您需要的服务类别',
    posts_key: [],
    lists_data: [],
    offset: -1, // 偏移量
    get_num: 5, // 每次获取数据得数量
    Approver:'lixinle',
    appID:0,
    starDesc: '',
    stars: [{
      lightImg: '/images/star_light.png',
      blackImg: '/images/star_black.png',
      flag: 1,
      message: ''
    }, {
      lightImg: '/images/star_light.png',
      blackImg: '/images/star_black.png',
      flag: 1,
      message: ''
    }, {
      lightImg: '/images/star_light.png',
      blackImg: '/images/star_black.png',
      flag: 1,
      message: ''
    }, {
      lightImg: '/images/star_light.png',
      blackImg: '/images/star_black.png',
      flag: 1,
      message: ''
    }, {
      lightImg: '/images/star_light.png',
      blackImg: '/images/star_black.png',
      flag: 1,
      message: ''
    }],
    assessLists: ['意见很有帮助', '态度非常好', '非常敬业', '非常专业认真', '回复很及时', '耐心细致']
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
    api.itserviceModule.itcanModifyshenQinginfo(data, (state, res) => {
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
      userName: 'userName'
        //itserviceinfo 
    };
    api.itserviceModule.itgetshenQinginfo(data, (state, res) => {
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
  w_x: function (e) {
    const ty = e.currentTarget.dataset.ty
    console.log(e.currentTarget.dataset);
    console.log(ty);
    //绑定部门编号
    this.setData({
      deID: ty,
    });
  },
  tapMainMenu: function (e) {
    console.log(e);
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(index);
    var newSubMenuDisplay = initSubMenuDisplay();
    if (this.data.subMenuDispaly[index] == 'hidden') {
      newSubMenuDisplay[index] = 'show';
      this.setData({ currentTab: index });
    } else {
      newSubMenuDisplay[index] = 'hidden';
      this.setData({ currentTab: -1 });
    }
    this.setData({ subMenuDispaly: newSubMenuDisplay });
  },
  onLoad: function (e) {
    //检查是否已有记录
    // this.checkIsHaveRecord();
    console.log(e);
    var self = this;
    var postId = e.id;
    var AppID = e.id;
    self.setData({
       AppID:AppID
       });
    console.log(postId)
    var userName = 'bird.han';
    var Approver = 'lixinle';
    console.log(userName)
    console.log(Approver)
    this.initshenQinginfo(postId)
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        self.setData({ winWidth: res.windowWidth });
        self.setData({ winHeight: res.windowHeight });
      },
    })
  },
  // 选择评价星星
  starClick: function (e) {
    var that = this;
    for (var i = 0; i < that.data.stars.length; i++) {
      var allItem = 'stars[' + i + '].flag';
      that.setData({
        [allItem]: 2
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'stars[' + i + '].flag';
      that.setData({
        [item]: 1
      })
    }
    this.setData({
      starDesc: this.data.stars[index].message
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
  }
})