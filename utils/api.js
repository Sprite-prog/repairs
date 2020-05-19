const apiURL = 'https://wxoaminiapps-qa.lshmnc.com.cn';
const itserviceModule = {

  submitshenQinginfo(data, callback) {
    wx.request({
      url: `${apiURL}/api/ITService/SubmitApplicationInfo`,
       //php接口地址
      method: 'GET',
      data,
      header: {
        'Content-Type': 'application/json',
      },
      success(res) {
        callback('success', res);
      },
      fail(res) {
        callback('fail', res);
      },
      complete(res) {
        callback('complete', res);
      },
    })
  },

  getshenQinginfo(data, callback) {
    wx.request({
      url: `${apiURL}/api/ITService/GetApplicationInfo`,
      method: 'GET',
      data,
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      success(res) {
        callback('success', res);
      },
      fail(res) {
        callback('fail', res);
      },
      complete(res) {
        callback('complete', res);
      },
    });
  },
//我得申请列表
 getmylist(data, callback) {
    wx.request({
      url: `${apiURL}/api/ITService/ShowMyApplicationList`,
      method: 'GET',
      data,
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      success(res) {
        callback('success', res);
      },
      fail(res) {
        callback('fail', res);
      },
      complete(res) {
        callback('complete', res);
      },
    });
  },

  // onReachBottom() {
  //   wx.showLoading({
  //     title: '正在加载数据',
  //     position: 2000
  //   })
  //   var userName = 'bird.han';
  //   // 在这里发送网络请求
  //   var that = this;
  //   var num = this.data.offset;
  //   wx.request({
  //     url: 'https://wxoaminiapps-qa.lshmnc.com.cn/api/ITService/ShowMyApplicationList',
  //     data: {
  //       qID: num,
  //       userName: userName
  //     },
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success(res) {
  //       var newList = res.data.Data
  //       // console.log(that.lists_data)
  //       newList.map((trip) => {
  //         // console.log(trip);
  //         const item = trip;
  //         item.CreateDate = formatTime(new Date(item.CreateDate));
  //         return item;
  //       });
  //       var result = newList;
  //       var count = result[that.data.get_num - 1].ID
  //       console.log(count)
  //       that.setData({
  //         offset: count,
  //         posts_key: that.data.posts_key.concat(result)
  //       })
  //     },
  //     complete: function () {
  //       wx.hideLoading()
  //     }
  //   })

  // },



  updateshenQinginfo(data, callback) {
    wx.request({
      url: `${apiURL}/api/ITService/GetApplicationInfo`,
      method: 'GET',
      data,
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      success(res) {
        callback('success', res);
      },
      fail(res) {
        callback('fail', res);
      },
      complete(res) {
        callback('complete', res);
      },
    });
  },
  canModifyshenQinginfo(data, callback) {
    wx.request({
      url: `${apiURL}/api/ITService/GetApplicationInfo`,
      method: 'GET',
      data,
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      success(res) {
        callback('success', res);
      },
      fail(res) {
        callback('fail', res);
      },
      complete(res) {
        callback('complete', res);
      },
    });
  },
//it普通运维人员未认领单子接口
  itsqlists(data, callback){
    wx.request({
      url: `${apiURL}/api/ITService/ShowUnAssignApplicationList`,
      method: 'GET',
      data,
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      success(res) {
        callback('success', res);
      },
      fail(res) {
        callback('fail', res);
      },
      complete(res) {
        callback('complete', res);
      },
    });
  },
//it普通运维人员已经认领单子接口
itsqlistsling(data, callback){
  wx.request({
    url: `${apiURL}/api/ITService/ShowApplicationListByHelpDesk`,
    method: 'GET',
    data,
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    success(res) {
      callback('success', res);
    },
    fail(res) {
      callback('fail', res);
    },
    complete(res) {
      callback('complete', res);
    },
  });
},


  //it运维人员的填写解决方案的接口
  replyApplicationInfo(data, callback) {
    wx.request({
      url: `${apiURL}/api/ITService/ReplyApplicationInfo`,
       //php接口地址
      method: 'GET',
      data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        callback('success', res);
      },
      fail(res) {
        callback('fail', res);
      },
      complete(res) {
        callback('complete', res);
      },
    })
  },
  //it运维解决完之后详情页接口
  itgetshenQinginfo(data, callback) {
    wx.request({
      url: `${apiURL}/api/ITService/ReplyApplicationInfo`,
      method: 'GET',
      data,
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      success(res) {
        callback('success', res);
      },
      fail(res) {
        callback('fail', res);
      },
      complete(res) {
        callback('complete', res);
      },
    });
  },
  itupdateshenQinginfo(data, callback) {
    wx.request({
      url: `${apiURL}/api/ITService/GetApplicationInfoFull`,
      method: 'GET',
      data,
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      success(res) {
        callback('success', res);
      },
      fail(res) {
        callback('fail', res);
      },
      complete(res) {
        callback('complete', res);
      },
    });
  },
  itcanModifyshenQinginfo(data, callback) {
    wx.request({
      url: `${apiURL}/api/ITService/ReplyApplicationInfo`,
       //php接口地址
      method: 'GET',
      data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        callback('success', res);
      },
      fail(res) {
        callback('fail', res);
      },
      complete(res) {
        callback('complete', res);
      },
    })
  },
}
const userinfo = {  
  search(data, callback) {
    wx.request({
      url: `${apiURL}/api/User/SearchUserInfo`,
      method: 'GET',
      data,
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      success(res) {
        callback('success', res);
      },
      fail(res) {
        callback('fail', res);
      },
      complete(res) {
        callback('complete', res);
      },
    });
  },
  getuserinfo(data, callback) {
    wx.request({
      url: `${apiURL}/api/User/GetUserInfo`,
      method: 'GET',
      data,
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      success(res) {
        callback('success', res);
      },
      fail(res) {
        callback('fail', res);
      },
      complete(res) {
        callback('complete', res);
      },
    });
  },
  checkuseradinfo(data, callback) {
    wx.request({
      url: `${apiURL}/api/User/CheckADLoginInfo`,
      method: 'GET',
      data,
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      success(res) {
        callback('success', res);
      },
      fail(res) {
        callback('fail', res);
      },
      complete(res) {
        callback('complete', res);
      },
    });
  }
};
module.exports = {
  userinfo,
  itserviceModule
};