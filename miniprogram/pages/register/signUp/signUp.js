// pages/register/signUp/signUp.js
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
  },
  bindNameInput: function (e) {
    this.setData({
      inputName: e.detail.value
    })
    if (this.data.inputName.length != 0) {
      DBusers.where({
        name: this.data.inputName
      })
        .get()
        .then(res => {
          if (res.data.length == 0) {
            this.setData({
              nameAlert: true
            })
          }
          else if (res.data.length == 1) {
            this.setData({
              nameAlert: false
            })
          }
        })
    }
    else if (this.data.inputName.length == 0) {
      this.setData({
        nameAlert: false
      })
    }
  },
  bindPwdInput: function (e) {
    this.setData({
      inputPwd: e.detail.value
    })
    console.log("name:" + this.data.inputName, "pwd:" + this.data.inputPwd)
  },
  submitSignup: function (e) {
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
        if (res.data.length == 0) {
          wx.showModal({
            title: '登录失败',
            content: '请确认用户名、密码后重新登录',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('登录失败提示')
              }
            }
          })
        }
        else if (res.data.length == 1) {
          this.setData({
            nameAlert: false
          })
          wx.switchTab({
            url: '../../home/home',
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