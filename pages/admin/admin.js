
var app = getApp()
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');
const formatTime = util.formatTime;
var page = 0;
Page({
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    // shenpi: true,
    deptID:1,
    biaoti: '',
    time: '',
    state: '',
    posts_key: [],
    posts_keyling:[],
    list_yijiejue: [],
    lists_data: [],
    offset: -1, // 偏移量
    get_num: 5, // 每次获取数据得数量
    curStatus: 1,
    hidden:true,
    triggered:false,
    qID:-1,
    ReqTypeName:'',
 
    
  },
  fenpei:function(e){
   wx.navigateTo({
     url: '../admin/admin-sousuo',
   })
  },


  renling:function(e){
    const type = e.currentTarget.dataset.type
    const id = e.currentTarget.dataset.id
    console.log(e.currentTarget.dataset);
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
      appID : id
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      console.log(res.data)
    }
  })
  wx.showModal({
    title: '提示',
    content: '确定认领这条服务申请吗？',
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        wx.navigateTo({
          url: '../admin/admin?currentid=2',
        })
        console.log(type);
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
  },

  shenpidan: function (e) {
    const type = e.currentTarget.dataset.type
    console.log(e.currentTarget.dataset);
    console.log(type);
    //绑定部门goJiejue_1编号
    this.setData({
      deptID: type,
    });
    this.showlist(type,-1);
  
  },

  //跳转已解决详情
  goJiejue_1:function(event) {
    var postId = event.currentTarget.dataset.id;
    var curStatus = event.currentTarget.dataset.curstatus;
    console.log("on post id is" + postId)
    console.log("状态是啥？？" + event.currentTarget.dataset.curstatus)
    if (curStatus == 1) {
      wx.navigateTo({
        url: '/pages/sq-wenti/sq-wenti-fill?id=' + postId,
      })
    } else{
      if(curStatus == 2){
        wx.navigateTo({
          url: '/pages/sqliebiao/sqliebiao_weiJiejue?id=' + postId,
        })
      }
      else {
        if(curStatus == 3){

          wx.navigateTo({
            url: '/pages/sqliebiao/sqliebiao_yiJiejue?id=' + postId,
          }) 
        }
      }
    }
  },

  //未处理单子列表
  showlist: function(status,qID) {
    var that = this;
    const data = {
      curStatus: status,
      qID: qID,
      userName: 'bird.han',
    }; 
    //调取申请列表的api   遍历数组返回相应的格式的时间
    api.itserviceModule.itsqlists(data, (state, res) => {
      if (state === 'success') {
        console.log(res);
        if (res.data.StatusCode == 1000) {
          var newList = res.data.Data
          // var qID = newList[newList.length - 1].ID  鸟哥改
          var count = newList[newList.length - 1].ID
          that.setData({
            offset: count
          })
          console.log(count)
          if(newList.length>0)
          {
            newList.map((trip) => {
              // console.log(trip);
              const item = trip;
              item.CreateDate = formatTime(new Date(item.CreateDate));
              return item;
            });
            that.setData({
              posts_key: newList
            });
          } 
          else
          {
            that.setData({
              posts_key: []
            });
          } 
        };
      }
    });
  },
  //已处理单子列表
  showlistling: function(status,qID) {
    var that = this;
    const data = {
      curStatus: status,
      qID: qID,
      userName: 'bird.han',
    }; 
    //调取申请列表的api   遍历数组返回相应的格式的时间
    api.itserviceModule.itsqlistsling(data, (state, res) => {
      if (state === 'success') {
        console.log(res);
        if (res.data.StatusCode == 1000) {
          var newListling = res.data.Data
          // var qID = newList[newList.length - 1].ID  鸟哥改
          var xinle = newListling[newListling.length - 1].ID
          that.setData({
            offset: xinle
          })
          console.log(xinle)
          if(newListling.length>0)
          {
            newListling.map((trip) => {
              // console.log(trip);
              const item = trip;
              item.CreateDate = formatTime(new Date(item.CreateDate));
              return item;
            });
            that.setData({
              posts_keyling: newListling
            });
          }  
          else {
            that.setData({
              posts_key: []
            });
          } 
        };
      }
    });
  },











  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.showlist(1,-1);
    this.showlistling(1,-1)
    // var type = options.typeid;
    // this.setData({
    //   deptID: options.typeid
    // });
    var type = options.curStatus;
    this.setData({
      deptID: options.curStatus
    });
  },
  // refresh:function() {
  //   wx.showLoading({
  //     title: '数据刷新中',
  //     duration: 2000,
  //     mask:true
  //   })　　
  //   setTimeout(() => {
      
  //     wx.hideLoading()
  //   }, 2000)
  //   　wx.stopPullDownRefresh();
    
  // },
  refresh() {
    if (this._freshing) return
    this._freshing = true
    setTimeout(() => {
      this.setData({
        triggered: false,
      })
      this._freshing = false
    }, 3000)
  },
  //自定义下拉刷新被复位
  restore(e) {
    console.log(this.data.deptID);
  },


  bindDownLoad: function() {
    wx.showLoading({
      title: '正在加载数据',
      duration: 3000
    })
    var userName = 'bird.han';
    var that = this;
    var num = this.data.offset;
    var type = this.data.deptID;
    console.log(type);
   
    // this.setData({
    //   deptID:type
    // });
    console.log(num);
    console.log(type);
    wx.request({
      url: 'https://wxoaminiapps-qa.lshmnc.com.cn/api/ITService/ShowUnAssignApplicationList',
      data: {
        qID: num,
        curStatus: type
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        var newList = res.data.Data;
        newList.map((trip) => { 
          const item = trip;
          item.CreateDate = formatTime(new Date(item.CreateDate));
          return item;
        });
        var result = newList;
        console.log('申请的信息是什么'+typeof(ReqTypeName));


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
      complete: function() {
        wx.hideLoading()
      }
    })
  },

  bindDownLoadling: function() {
    wx.showLoading({
      title: '正在加载数据',
      duration: 3000
    })
    var userName = 'bird.han';
    var that = this;
    var num = this.data.offset;
    var type = this.data.deptID;
    this.setData({
      deptID:type
    });
    console.log(num);
    wx.request({
      url: 'https://wxoaminiapps-qa.lshmnc.com.cn/api/ITService/ShowApplicationListByHelpDesk',
      data: {
        qID: num,
        userName:'bird.han'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        var newListling = res.data.Data;
        newListling.map((trip) => {
          console.log('这trip显示是'+trip);
          const item = trip;
          item.CreateDate = formatTime(new Date(item.CreateDate));
          return item;
        });
        var result = newListling;
        if (result.length > 0) {
          var count = result[result.length - 1].ID
          that.setData({
            offset: count,
            posts_keyling: that.data.posts_keyling.concat(result)
          })
        } else {
          // wx.showToast({
          //   title: '数据加载完毕',
          //   icon: 'none',
          //   duration: 2000 //持续的时间
          // })
        }

      },
      complete: function() {
        wx.hideLoading()
      }
    })
  },






  //  //go未解决页面的详情
  onPostTap: function(event) {
    var postId = event.currentTarget.dataset.id;
    console.log(postId)
    wx.navigateTo({
      url: '../sq-wenti/sq-wenti-fill?id=' + postId,
    })
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})