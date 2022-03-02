// pages/register/signIn/signIn.js
const app = getApp()
const db = wx.cloud.database()
const DBusers = db.collection("users")
Page({
  data: {
    navTitle: '职工信息管理系统',
    back: true,
    nameAlert: false,
    inputName: '',
    inputPwd: '',
    showAgreement: false,
    buttons: [
      {
        type: 'default',
        className: '',
        text: '拒绝',
        value: 0
      },
      {
        type: 'primary',
        className: '',
        text: '同意',
        value: 1
      }
    ]
  },
  openAgreement: function () {
    this.setData({
      showAgreement: true
    })
  },
  buttontap(e) {
    let that = this
    console.log(e.detail)
    if (e.detail.index == 1) {
      that.submitSignin()
    }
    else if (e.detail.index == 0) {
      that.setData({
        showAgreement: false
      })
    }
  },
  bindNameInput: function (e) {
    let that = this
    that.setData({
      inputName: e.detail.value
    })
    if (that.data.inputName.length != 0) {
      DBusers.where({
        name: that.data.inputName
      })
        .get()
        .then(res => {
          if (res.data.length == 0) {
            that.setData({
              nameAlert: true
            })
          }
          else if (res.data.length == 1) {
            that.setData({
              nameAlert: false
            })
          }
        })
    }
    else if (that.data.inputName.length == 0) {
      that.setData({
        nameAlert: false
      })
    }
  },
  bindPwdInput: function (e) {
    var that = this
    that.setData({
      inputPwd: e.detail.value
    })
    console.log("name:" + that.data.inputName, "pwd:" + that.data.inputPwd)
  },
  submitSignin: function (e) {
    var that = this
    let inputName = that.data.inputName
    let inputPwd = that.data.inputPwd
    DBusers.where({
      name: inputName,
      pwd: inputPwd
    })
      .get()
      .then(res => {
        console.log(res.data.length, res.data[0])
        app.globalData.name = res.data[0].name
        app.globalData.eid = res.data[0].eid
        app.globalData.group = res.data[0].group
        app.globalData.type = res.data[0].type
        console.log(app.globalData.name, app.globalData.type)
        if (res.data.length == 0) {
          wx.showModal({
            title: '登录失败',
            content: '请确认姓名、密码后再次登录',
            showCancel: false,
            success: function (res) {
              that.setData({
                showAgreement: false
              })
              if (res.confirm) {
                console.log('登录失败提示')
              }
            }
          })
        }
        else if (res.data.length == 1) {
          if (res.data[0].eid == '' || res.data[0].group == '' || res.data[0].name == '' || res.data[0].openid == '') {
            wx.showModal({
              title: '用户信息不完整',
              content: '请先完成账户注册',
              showCancel: false,
              success: function (res) {
                that.setData({
                  showAgreement: false
                })
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
            that.setData({
              showAgreement: false
            })
            wx.switchTab({
              url: '../../home/home',
              success: function (res) {
                console.log("登录成功")
                console.log(app.globalData.name, app.globalData.type)

                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            })
          }
        }
        else {
          wx.showModal({
            title: '登录失败',
            content: '请确认网络正常后再次登录，或联系管理员',
            showCancel: false,
            success: function (res) {
              that.setData({
                showAgreement: false
              })
              if (res.confirm) {
                console.log('登录失败提示，系统错误（网络？）')
              }
            }
          })
        }
      })
  },

  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {

  },

  /* 生命周期函数--监听页面初次渲染完成 */
  onReady: function () {

  },

  /* 生命周期函数--监听页面显示 */
  onShow: function () {

  },

  /* 生命周期函数--监听页面隐藏 */
  onHide: function () {

  },

  /* 生命周期函数--监听页面卸载 */
  onUnload: function () {

  },

  /* 页面相关事件处理函数--监听用户下拉动作 */
  onPullDownRefresh: function () {

  },

  /* 页面上拉触底事件的处理函数 */
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