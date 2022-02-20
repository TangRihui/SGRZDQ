// miniprogram/pages/home/home.js
// V1.0.0
//1、提供「微信账号登录」和「密码登录」两种登录方式，在每次启动小程序时自动使用微信账号登录。
//2、普通用户可查看、修改本人信息。
//3、管理员用户可获取班组信息的excel表格的下载链接。
//4、登录后可退出登录，登录其他账号。
// 测试备注
//1、首次注册方法：首次访问小程序时，点击「注册」按钮，输入姓名test1，工号008888，设置密码后登录小程序，该账户为系统管理员账户。
//2、登录其他账号方法：点击「使用密码登录」按钮，输入姓名test2，密码111111，该账户为普通用户。
//3、退出账户方法：登录小程序后，在下方tab栏点击「设置」后，点击「退出登录」。
const app = getApp()
const db = wx.cloud.database()
const DBusers = db.collection("users")
Page({
  data: {
    navTitle: '注册/登录',
    back: false,
    // isTipTrue: false
  },

  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    console.log(options.isAutoSignIn)
    let isAutoSignIn = options.isAutoSignIn
    let that = this
    that.autoSignin(isAutoSignIn)
    if (wx.getUserProfile) {
      that.setData({
        canIUseGetUserProfile: true,
      })
    }
    // 将工号eid由number格式转换为6位string格式
    // 重新导入数据库后运行该函数
    // that.numToString()
      // time = options.formatTime(new Date());
      // console.log("打开小程序的时间是：", time)
      that.setData({
        isTipTrue:true
      })

  
  },
  tipAgree:function(){
    this.setData({
      isTipTrue:false
    })
 },
  async numToString() {
    var that = this
    // 获取数据库
    var toString = await wx.cloud.callFunction({
      name: "getUsers"
    })
    // 处理数据库返回值
    that.setData({
      users: toString.result.users.data
    })
    var users = that.data.users
    for (let i = 0; i < users.length; i++) {
      var oldEid = users[i].eid
      var newEid = users[i].eid
      // 更改eid格式
      if (oldEid.toString().length == 1) {
        newEid = '00000' + oldEid
        console.log(1, newEid)
      }
      else if (oldEid.toString().length == 2) {
        newEid = '0000' + oldEid
        console.log(2, newEid)
      }
      else if (oldEid.toString().length == 3) {
        newEid = '000' + oldEid
        console.log(3, newEid)
      }
      else if (oldEid.toString().length == 4) {
        newEid = '00' + oldEid
        console.log(4, newEid)
      }
      else if (oldEid.toString().length == 5) {
        newEid = '0' + oldEid
        console.log(5, newEid)
      }
      else if (oldEid.toString().length == 6) {
        newEid = '' + oldEid
        console.log(6, newEid)
      }
      else {
        console.log("转换错误")
      }
      // 更改数据库
      DBusers.where({
        eid: oldEid
      })
        .update({
          data: {
            eid: newEid
          },
          success: function (res) {
            console.log(res)
          }
        })
    }
    setTimeout(() => {
      console.log('格式转换完成')
    }, 1000);
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
        // wx.switchTab({
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
  autoSignin: function (e) {
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    })
    var that = this
    if (e == false || e == 'false' || e == "false") {
      wx.hideToast({
        success: (res) => {
          console.log('退出登录')
        },
      })
      return
    }
    else {
      that.onGetOpenid()
      setTimeout(() => {
        if (wx.getStorageSync('openid').length != 0) {
          DBusers.where({
            openid: wx.getStorageSync('openid')
          })
            .get()
            .then(res => {
              if (res.data.length == 1) {
                if (res.data[0].eid == '' || res.data[0].group == '' || res.data[0].name == '' || res.data[0].openid == '') {
                  wx.showModal({
                    title: '用户信息不完整',
                    content: '请先完成账户注册',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: './signUp/signUp',
                        })
                        console.log('用户信息不完整')
                      }
                    }
                  })
                }
                else {
                  wx.hideToast({
                    success: (res) => {
                      console.log('登录用户信息正确')
                    },
                  })
                  console.log(res.data[0])
                  app.globalData.name = res.data[0].name
                  app.globalData.eid = res.data[0].eid
                  app.globalData.group = res.data[0].group
                  app.globalData.type = res.data[0].type
                  wx.switchTab({
                    url: '../home/home',
                    success: function (res) {
                      console.log("登录成功")
                      wx.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 2000
                      })
                    }
                  })
                }
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
                wx.hideToast({
                  success: (res) => {
                    console.log('登录用户信息正确')
                  },
                })
                console.log(res.data[0])
                app.globalData.name = res.data[0].name
                app.globalData.eid = res.data[0].eid
                app.globalData.group = res.data[0].group
                app.globalData.type = res.data[0].type
                wx.switchTab({
                  url: '../home/home',
                  success: function (res) {
                    console.log("登录成功")
                    wx.showToast({
                      title: '登录成功',
                      icon: 'success',
                      duration: 2000
                    })
                  }
                })
              }
            })
        }
      }, 750);
    }
  },
  signUp: function () {
    var that = this
    that.onGetOpenid()
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    })
    setTimeout(() => {
      // console.log(wx.getStorageSync('openid').length)
      if (wx.getStorageSync('openid').length == 0) {
        wx.navigateTo({
          url: './signUp/signUp',
        })
      }
      else {
        that.signinOpenid()
      }
    }, 750);
  },
  signinOpenid: function () {
    var that = this
    that.onGetOpenid()
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    })
    setTimeout(() => {
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
            // console.log(res.data.length)
            if (res.data.length == 1) {
              wx.switchTab({
                url: '../home/home',
                success: function (res) {
                  console.log("登录成功")
                  wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
              })
            }
            else if (res.data.length == 0) {
              wx.navigateTo({
                url: './signUp/signUp',
              })
            }
            else {
              wx.showModal({
                title: '登录失败',
                content: '返回后重试或使用密码登录，仍无法登录请联系工作人员解决',
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
    }, 750);

  },

  signinPwd: function () {
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    })
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

  /* 用户点击右上角分享 */
  onShareAppMessage: function () {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '职工信息管理系统',
          imageUrl: '../../../images/logo.jpg',
        })
      }, 500)
    })
    return {
      path: '/page/register/register',
      promise 
    }
}
})