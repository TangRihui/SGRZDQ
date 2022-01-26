// miniprogram/pages/home/home.js
const app = getApp()
const db = wx.cloud.database()
const DBusers = db.collection("users")
Page({
  data: {
    navTitle: '注册/登录',
    back: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.autoSignin()
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
    // 将工号eid由number格式转换为6位string格式
    wx.cloud.callFunction({
      name: "getUsers",
      success(res) {
        var that = this
        console.log("云函数获取数据成功！", res.result.data, res.result.data.length)
        for(let i=0; i<res.result.data.length; i++){
          var oldEid = res.result.data[i].eid
          var newEid = res.result.data[i].eid
          if(oldEid.toString().length == 1) {
            newEid = '00000' + oldEid
            that.updateEid()
          }
          else if(oldEid.toString().length == 2) {
            newEid = '0000' + oldEid
            that.updateEid()
          }
          else if(oldEid.toString().length == 3) {
            newEid = '000' + oldEid
            that.updateEid()
          }
          else if(oldEid.toString().length == 4) {
            newEid = '00' + oldEid
          }
          else if(oldEid.toString().length == 5) {
            newEid = '0' + oldEid
          }
          else if(oldEid.toString().length == 6) {
            newEid = '' + oldEid
          }
          else {
            console.log("转换错误")
          }

        }
      },
      fail(res) {
        console.log("云函数获取数据失败！", res)
      }
    })
  },
  updateEid: function(e) {
    DBusers.where({
      eid: oldEid
    })
    .get(res=>{
      console.log(res, 'a')
    })
  },

  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '微信用户信息只用于登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
        console.log(this.data.nickName, this.data.avatarUrl, this.data.userInfo)
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('云函数login调用成功，openid:', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.setStorageSync('openid', res.result.openid)
        this.setData({
          openid: res.result.openid
        })
        // wx.navigateTo({
        //   url: '../home/home',
        // })

      },
      fail: err => {
        console.error('云函数login调用失败', err)
        wx.showModal({
          title: '获取微信账号信息失败',
          content: '请确认网络正常后再次登录',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('点击确认回调')
            }
          }
        })
      }
    })
  },
  autoSignin: function () {
    var that = this
    that.onGetOpenid()
    setTimeout(() => {
      if (wx.getStorageSync('openid').length != 0) {
        DBusers.where({
          openid: wx.getStorageSync('openid')
        })
          .get()
          .then(res => {
            if (res.data.length == 1) {
              wx.navigateTo({
                url: '../home/home',
                success: function (res) {
                  console.log("登录成功")
                  wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 1500
                  })
                }
              })
            }
          })
      }
      else if (app.globalData.openid.length != 0) {
        console.log(app.globalData.openid)
        DBusers.where({
          openid: app.globalData.openid
        })
          .get()
          .then(res => {
            console.log(res.data.length)
            if (res.data.length == 1) {
              wx.navigateTo({
                url: '../home/home',
                success: function (res) {
                  console.log("登录成功")
                  wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 1500
                  })
                }
              })
            }
          })
      }
    }, 500);
  },
  signUp: function () {
    var that = this
    that.onGetOpenid()
    console.log()
    wx.navigateTo({
      url: './signUp/signUp',
    })
  },
  signinOpenid: function () {
    var that = this
    that.onGetOpenid()
    console.log()
    if (wx.getStorageSync('openid').length == 0) {
      wx.showModal({
        title: '登录信息异常',
        content: '请使用密码登录，或联系工作人员解决',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('未获取openid')
          }
        }
      })
    }
    else {
      DBusers.where({
        openid: wx.getStorageSync('openid')
      })
        .get()
        .then(res => {
          console.log(res.data.length)
          if (res.data.length == 1) {
            wx.navigateTo({
              url: '../home/home',
            })
          }
          else if (res.data.length == 0) {
            wx.navigateTo({
              url: './signUp/signUp',
            })
          }
          else {
            wx.showModal({
              title: '登录信息异常',
              content: '请使用密码登录，或联系工作人员解决',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('openid查询数据库异常')
                }
              }
            })
          }
        })
    }
  },

  signinPwd: function () {
    var that = this
    that.onGetOpenid()
    console.log(wx.getStorageSync('openid'))
    wx.navigateTo({
      url: './signIn/signIn',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})