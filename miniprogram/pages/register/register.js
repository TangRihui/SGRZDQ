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
        console.log('openid: ', res.result.openid)
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
      console.log(app.globalData.openid)
      if (wx.getStorageSync('openid').length != 0) {
        console.log(app.globalData.openid, wx.getStorageSync('openid'))
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