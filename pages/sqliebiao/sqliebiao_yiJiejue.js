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
    fujian: '', //附件
    othernew: '', //备注的其他信息
    path: '',
    filename: '',
    typeName: '请选择您需要的服务类别',
    posts_key: [],
    posts_keyling:[],
    lists_data: [],
    offset: -1, // 偏移量
    get_num: 5, // 每次获取数据得数量
    Approver:'',
    appID:0,
    AppID:0,
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
    assessLists: ['意见很有帮助', '态度非常好', '非常敬业', '非常专业认真', '回复很及时', '耐心细致'],
    comment_content:'',
    replyStar:5,
    reply_list:[],
    status:'',
    curStatus:0,
    appraise:{},
  },
  w_x: function (e) {
    const ty = e.currentTarget.dataset.ty
    // console.log(e.currentTarget.dataset);
    // console.log(ty);
    //绑定部门编号
    this.setData({
      deID: ty,
    });
  },
  checkIsHaveRecord: function () {
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
  checkIsCanModifyRecord: function () {
    var that = this;
    const data = {
      //获取新闻公告来源的部门编号，用于调取API新闻列表传参使用
      userName: App.WxService.getStorageSync('bird.han')
    };
    api.itserviceModule.canModifyshenQinginfo(data, (state, res) => {
      if (state === 'success') {
        // console.log(res);
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
  initshenQinginfo: function (postid) {
    var that = this;
    var userName = 'bird.han';
    var appID = postid;
    // console.log("hahha" + appID)
    const data = {
      //获取新闻公告来源的部门编号，用于调取API新闻列表传参使用
      // userName: App.WxService.getStorageSync('username'),
      appID:appID,
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
  confirm(event){
    // console.log(event);
    this.setData({
      comment_content:event.detail.value
    })
  },
  blur(event){
    // console.log(event);
    this.setData({
      comment_content: event.detail.value
    })
  },
  submit(){
    const appid = this.data.AppID;
    const replyComment = this.data.comment_content;
    const replyStar = this.data.replyStar;
    const userName = this.data.username;
    const replyCurStatus = 2;
    console.log(replyComment, replyStar, userName);
    const that = this;
    //判断textarea是否为空
    if (replyComment == "") {
      wx.showModal({
        title: '提示',
        content: '请填写评价内容',
        showCancel: false,
      })
    }
    else {
      //请求接口传递数据
      let replyModel = {};
      replyModel.AppID = appid;
      replyModel.ReplyComment = replyComment;
      replyModel.ReplyStar = 0;
      replyModel.Approver = "test1";
      replyModel.ReplyCurStatus = replyCurStatus;
      replyModel.ReplyType = 1;
      console.log(replyModel);
      const data = {
        //获取新闻公告来源的部门编号，用于调取API新闻列表传参使用
        replyinfo: replyModel
      };
      wx.showModal({
        title: '提示',
        content: '确定提交评价信息？',
        success: function (res) {
          if (res.confirm) {
            api.itserviceModule.replyApplicationInfo(data, (state, res) => {
              console.log(res);
              if (res.data.StatusCode == 1000) {
                wx.showToast({
                  title: '感谢您的评价',
                });
                wx.navigateTo({
                  url: '../sq-wenti/sq-wenti?currentid=2',
                })
              }
            })
          }
          else if (res.cancel) {

          }
        }
      })

    }
  },
  // formSubmit: function (e) {
  //   var that = this;
  //   const params = e.detail.value
  //   console.log(e.detail)
  //   // return;
  //   var type = that.data.typeid;
  //   console.log("这里的type" + type)
  //   var AppID = that.data.id;
  //   // console.log(type)
  //   //如果方案为空提醒填写方案
  //   if (params.ReplyComment == '') {
  //     wx.showModal({
  //       title: '提示',
  //       content: '请填写解决方案',
  //       showCancel: false,
  //       success: function (res) { }
  //     })
  //     return false;
  //   };
  //   var replymodel = {};
  //   replymodel.AppID = that.data.AppID; //params.AppID == undefined ? '' : params.AppID;
  //   replymodel.Approver = 'bird.han'; //params.Approver == undefined ? '' : params.Approver;
  //   replymodel.ReplyComment = params.replycomment == undefined ? '' : params.replycomment;
  //   // replymodel.ReplyStar = parms.replystar == undefined ? '': params.replystar;
  //   // replymodel.ReplyCurStatus = 3;
  //   replymodel.ReplyStar = 0 ;
  //   // replymodel.ReplyCurStatus = parms.ReplyStar == undefined ? '': params.reReplyCurStatus;
  //   console.log(replymodel)
  //   const data = {
  //     //获取新闻公告来源的部门编号，用于调取API新闻列表传参使用
  //     replyinfo: replymodel
  //   };
  //   console.log("此时的replyModel是什么？？" + replyModel);
  //   api.itserviceModule.replyApplicationInfo(data, (state, res) => {
  //     // console.log(res); 
  //     if (state === 'success') {
  //       console.log('看这是什么'+res);
  //       if (res.data.StatusCode == 1000) {
  //         wx.navigateTo({
  //           url: '/pages/sqliebiao/sqliebiao',
  //         })
  //       }
  //     }
  //   })
  //   console.log('form发生了submit事件，携带数据为：', e.detail.value)
  // },



  onLoad: function (e) {
    //检查是否已有记录
    this.checkIsHaveRecord();
    // console.log(e);
    var self = this;
    var postId = e.id;
    var curStatus = e.curStatus;
    var AppID = e.id;
    self.setData({
      AppID:AppID,
      curStatus: curStatus
    });
    wx.request({
      url: 'https://wxoaminiapps-qa.lshmnc.com.cn/api/ITService/ShowApplicationReplyList',
      data:{
        appID:AppID
      },
      success:function (res){
        console.log(res);
        if (res.data.StatusCode == 1000){
          const index = res.data.Data.length-1;
          self.setData({
            reply_list:res.data.Data,
            appraise:res.data.Data[index]
          })
          console.log(self.data.appraise)
        }
        else{
          
        }
      }
    })
    var userName = 'bird.han';
    var Approver = 'lixinle';
    this.initshenQinginfo(postId)
    wx.getSystemInfo({
      success: function (res) {
        self.setData({ winWidth: res.windowWidth });
        self.setData({ winHeight: res.windowHeight });
      },
    })
  },
  // 选择评价星星
  starClick: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    for(var i = 0;i<that.data.stars.length;i++){
      that.setData({
        ['stars[' + i + '].flag']: 2
      })
    }
    for (var j = 0; j <= index; j++) {
      
      that.setData({
        ['stars[' + j + '].flag']: 1
      })
    }
    that.setData({
      replyStar:index+1
    })
  },
  //失去焦点时获取textarea中的值
  reBlur(event){
    this.setData({
      comment_content:event.detail.value
    })
  },
  //用户点击完成时获取textarea中的值
  reConfirm(event) {
    this.setData({
      comment_content: event.detail.value
    })
  },
  //已确定时提交表单
  reSubmit(){
    const appid=this.data.AppID;
    const replyComment=this.data.comment_content;
    const replyStar=this.data.replyStar;
    const userName = this.data.username;
    const replyCurStatus = 4;
    console.log(replyComment, replyStar, userName);
    const that = this;
    //判断textarea是否为空
    if(replyComment == ""){
      wx.showModal({
        title: '提示',
        content: '请填写评价内容',
        showCancel:false,
      })
    }
    else{
      //请求接口传递数据
      let replyModel = {};
      replyModel.AppID = appid;
      replyModel.ReplyComment = replyComment;
      replyModel.ReplyStar = replyStar;
      replyModel.Approver = "test1";
      replyModel.ReplyCurStatus = replyCurStatus;
      replyModel.ReplyType = 1;
      console.log(replyModel);
      const data = {
        //获取新闻公告来源的部门编号，用于调取API新闻列表传参使用
        replyinfo: replyModel
      };
      wx.showModal({
        title: '提示',
        content: '确定提交评价信息？',
        success: function (res) {
          if(res.confirm){
            api.itserviceModule.replyApplicationInfo(data, (state, res) => {
              console.log(res);
              if (res.data.StatusCode == 1000) {
                wx.showToast({
                  title: '感谢您的评价',
                });
                wx.navigateTo({
                  url: '../sq-wenti/sq-wenti?currentid=2',
                })
              }
            })
          }
          else if(res.cancel){
            
          }
        }
      })
      
    }
  }
})