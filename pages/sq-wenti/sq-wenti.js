var App = getApp()
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');
const formatTime = util.formatTime;
var postsData = require('../../data/posts_data.js');
Page({
  data: {
   
    winWidth: 0,
    winHeight: 0,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null,
    deptID: 0,
    requester: '', //申请人
    department: '', //部门
    company: '', //公司
    phone:'',
    fujian: '', //附件
    othernew: '', //备注的其他信息
    path: '',
    filename: '',
    typeid: -1,
    posts_key: [],
    lists_data: [],
    Approver: '',
    offset: -0, // 偏移量
    get_num: 5, // 每次获取数据得数量
    array: ['1', '2', '3', '4'],
    pic_array: [ ],
    CurStatus:0,
    hx_index: '',
    index: 0,
    userName:'',
    reqType: 1,
    src: '',
    shenQinginfo:{
      UserName:'test1',
      Tel:'',
      ReqTypeName:'',
      OtherRemark:'',
      UploadFile:'123123'
    },
    picker:'',
    intro:''
  },
  bindChange_select: function (ev) {
    // 定义一个变量curindex 储存触发事件的数组对象的下标
    const curindex = ev.target.dataset.current
    //根据下标 改变该数组对象中的index值
    this.data.objArray[curindex].index = ev.detail.value
    //把改变某个数组对象index值之后的全新objArray重新 赋值给objArray
    this.setData({
      objArray: this.data.objArray
    })
  },
  picker(event){
    console.log(event);
    this.setData({
      picker: event.detail.pic_array_title
    })
  },
  intro(event) {
    console.log(event);
    this.setData({
      intro: event.detail.intro
    })
  },
  //showNews是点击页签的事件
  showNews: function (e) {
    const type = e.currentTarget.dataset.type
  
    //绑定部门编号
    this.setData({
      deptID: type,
    });
    // console.log('此时在哪个页签下'+type);
  },
  //我的申请列表
  showlist: function (e) {
    var that = this;
    const data = {
      userName: 'test1',
      qID: -1
    };
    //调取申请列表的api   遍历数组返回相应的格式的时间
    api.itserviceModule.getmylist(data, (state, res) => {
      if (state === 'success') {
        console.log(res);
        if (res.data.StatusCode == 1000) {
          var newList = res.data.Data
          var offset = newList[newList.length - 1].ID
          that.setData({
            offset: offset
          })
          // console.log('我的申请列表的偏移量'+offset)
          newList.map((trip) => {
            // console.log(trip);
            const item = trip;
            item.CreateDate = formatTime(new Date(item.CreateDate));
            return item;
          });
          that.setData({
            posts_key: newList
          });
        };
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userName = 'test1';
    this.showlist();
    var reqType = options.reqType;
    this.setData({
      reqType:reqType
    })
    this.setData({
      deptID: options.currentid
    });
    var self = this;
    //申请问题下拉框的接口
    wx.request({
      url: 'https://wxoaminiapps-qa.lshmnc.com.cn/api/ITService/ShowRequestTypeList',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
         console.log(res.data)
        self.setData({
          pic_array: res.data.Data,   //把json数据赋值给变量
        })
       
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res);
        self.setData({
          winWidth: res.windowWidth
        });
        self.setData({
          winHeight: res.windowHeight
        });
        // console.info(res.windowHeight);
        self.setData({
          scrollHeight: res.windowHeight
        });
      },
    })

  },
  //表单提交
  formSubmit: function () {
    var that = this;
    let picker = that.data.picker;
    let intro = that.data.intro;
    // console.log(params);
    var type = that.data.typeid;
    if (picker == '') {
      wx.showModal({
        title: '提示',
        content: '请选择您申请的问题',
        showCancel: false,
        success: function(res) {}
      })
    }
    else if(intro == ''){
      wx.showModal({
        title: '提示',
        content: '请填写问题描述',
        showCancel:false,
      })
    }
    else{
    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '报修申请提交中...',
            icon: 'loading',
            duration: 3000,
          });
          that.setData({
            deptID: that.options.currentid
          });
          that.setData({
            requester: '', //申请人
            department: '', //部门
            company: '', //公司
            fujian: '', //附件
            othernew: '' //备注的其他信息
          });
          var shenQinginfo = {};
          shenQinginfo.UserName = 'test1';
          shenQinginfo.ReqType = that.data.pic_array[picker].ID == undefined ? '' : that.data.pic_array[picker].ID;
          // shenQinginfo.CurStatus = 1;   
          // shenQinginfo.CurStatus=params.curStatus == undefined ? '':params.curStatus;
          shenQinginfo.UploadFile = '';
          shenQinginfo.OtherRemark = intro == undefined ? '' : intro;
          console.log("查看shenQinginfo" + shenQinginfo)
          const data = {
            //获取新闻公告来源的部门编号，用于调取API新闻列表传参使用
            itserviceInfo: shenQinginfo
          };
          api.itserviceModule.submitshenQinginfo(data, (state, res) => {
            console.log(res); 
            if (state === 'success') {
              console.log(res);
              if (res.data.StatusCode == 1000) {
                wx.hideToast();
                wx.showModal({
                  title: '提示',
                  content: '您的问题已成功提交',
                  showCancel: false,
                  success: function(res) {
                    if (res.confirm) 
                    {
                      wx.navigateTo({
                        url: '/page/sq-wenti/sq-wenti?deptID=2',
                      })
                      // that.setData({
                      //   deptID:2
                      // });
                      // that.showlist();
                    } 
                    else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })  
              }
            }
          });
        }
        else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    }
  },
  // formSubmit结束

  gobaoCunimg: function () {
    wx.navigateTo({
      url: '../baoCunimg/baoCunimg',
      success: function () {},
      fail: function () {},
      complete: function () {}
    })
  },
  //点击申请列表跳转到相应的详情页面
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.id;
    var curStatus = event.currentTarget.dataset.curstatus;
      wx.navigateTo({
        url: '/pages/sqliebiao/sqliebiao_yiJiejue?id=' + postId + '&curStatus=' + curStatus,
      })
  },
  gocamera:function(){
    wx.navigateTo({
      url: '../camera/camera',
    })
  },
  onShow: function (options) {
    // console.log(options)
    // var that = this;
    // GetPosts_key(that); 
  },
  onShareAppMessage: function () {},
  loadMore: function () {
    wx.showLoading({
      title: '正在加载数据',
      duration: 2000
    })
    var userName = 'bird.han';
    var that = this;
    var num = this.data.offset;
    wx.request({
      url: 'https://wxoaminiapps-qa.lshmnc.com.cn/api/ITService/ShowMyApplicationList',
      data: {
        qID: num,
        userName: userName,
        
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var newList = res.data.Data;
        newList.map((trip) => {
          console.log(trip);
          const item = trip;
          item.CreateDate = formatTime(new Date(item.CreateDate));
          return item;
        });
        var result = newList;
        if (result.length > 0) {
          var count = result[result.length - 1].ID
          that.setData({
            offset: count,
            posts_key: that.data.posts_key.concat(result)
          })
        } else {
          // wx.showToast({
          //   title: '数据加载完毕',
          //   icon: 'none',
          //   duration: 2000 //持续的时间
          // })
        }

      },
  
      complete: function () {
        wx.hideLoading()
      }
    })
  },

})