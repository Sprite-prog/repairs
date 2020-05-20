var App = getApp()
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');

Page({
  data: {
    index: 0,
    currentTab: 0,
    postid: 0,
    haverecord: true,
    canmodify: false,
    winWidth: 0,
    winHeight: 0,
    hiddenName: false,
    typeid: 1,
    shenQinginfo: [],
    fujian: '',
    othernew: '',
    username: 'bird.han',
    requester: '', //申请人
    hostSerialNo: '', //主机序列号
    phoneNumber: '', //手机号
    fujian: '', //附件
    othernew: '', //备注的其他信息
    path: '',
    filename: '',
    typeName: '请选择您需要的服务类别',
    posts_key: [],
    lists_data: [],
    offset: -1, // 偏移量
    get_num: 5, // 每次获取数据得数量
    Approver: '', //审批人
    ReplyComment: '', //it填写方案
    ReplyStar: 0,
    AppID: 0,
    ReplyCurStatus: 0,
    reply_list:[],
    appraise:{},
    curStatus:0

  },
  gorenling: function(e) {
    wx.navigateTo({
      url: '../sqliebiao/sqliebiao',
    })
  },
  checkIsHaveRecord: function() {
    wx.showToast({
      title: '未解决申请单获取中...',
      icon: 'loading',
      duration: 1000,
    });
    var that = this;
    const data = {
      //获取新闻公告来源的部门编号，用于调取API新闻列表传参使用
      userName: App.WxService.getStorageSync('bird.han')
    };
  },
  checkIsCanModifyRecord: function() {
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
        } else {
          that.setData({
            canmodify: false
          })
        }
      }
    });
  },
  initshenQinginfo: function(postid) {
    var that = this;
    var userName = 'bird.han';
    var appID = postid;
    const data = {
      //获取新闻公告来源的部门编号，用于调取API新闻列表传参使用
      // userName: App.WxService.getStorageSync('username'),
      appID: appID,
      userName: userName
    };
    //调用一个接口就有详情加表单提交
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
  //表单提交
  formSubmit: function(e) {
    var that = this;
    const params = e.detail.value;
    
    console.log(params)
    var type = that.data.typeid;
    var AppID = that.data.id;
    // console.log(type)
    //如果方案为空提醒填写方案
    if (params.ReplyComment == '') {
      wx.showModal({
        title: '提示',
        content: '请填写解决方案',
        showCancel: false,
        success: function(res) {}
      })
      return false;
    } else {
      var replymodel = {};
      replymodel.AppID = that.data.AppID; //params.AppID == undefined ? '' : params.AppID;
      replymodel.Approver = 'bird.han'; //params.Approver == undefined ? '' : params.Approver;
      replymodel.ReplyComment = params.ReplyComment == undefined ? '' : params.ReplyComment;
      replymodel.ReplyStar = 0;
      replymodel.ReplyCurStatus = 3;
      replymodel.ReplyType = 0;
      console.log(replymodel)
      const data = {
        //获取新闻公告来源的部门编号，用于调取API新闻列表传参使用
        replyinfo: replymodel
      };
      // console.log(replyModel);
      api.itserviceModule.replyApplicationInfo(data, (state, res) => {
        // console.log(res); 
        if (res.data.StatusCode == 1000) {
          wx.showToast({
            title: '提交成功',
          })
          wx.navigateTo({
            url: '../sqliebiao/sqliebiao?typeid=2',
          })
        }

      })
    }
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    //检查是否已有记录
    console.log(e);
    this.checkIsHaveRecord();
    var self = this;
    var postId = e.id;
    let curStatus = e.curStatus;
    var AppID = e.id;
    self.setData({
      AppID: AppID,
      Approver: Approver,
      curStatus: curStatus
    });
    console.log(postId)
    console.log(AppID)
    var userName = 'bird.han';
    var Approver = e.Approver;
    console.log(userName)
    console.log(e)
    console.log(Approver)
    this.initshenQinginfo(postId)
    this.initshenQinginfo(AppID)

    // this.checkIsHaveRecord();
    // var self = this;
    // var postId = e.self.id;
    // console.log(postId)
    // var userName = 'bird.han';
    // this.initshenQinginfo(postId)
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        self.setData({
          winWidth: res.windowWidth
        });
        self.setData({
          winHeight: res.windowHeight
        });
      },
    });
    wx.request({
      url: 'https://wxoaminiapps-qa.lshmnc.com.cn/api/ITService/ShowApplicationReplyList',
      data: {
        appID: AppID
      },
      success: function (res) {
        console.log(res);
        if (res.data.Msg == 'sucess') {
          const index = res.data.Data.length - 1;
          self.setData({
            reply_list: res.data.Data,
            appraise: res.data.Data[index]
          })
          console.log(self.data.appraise)
        }
        else {

        }
      }
    })
  },

})