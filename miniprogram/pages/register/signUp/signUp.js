// pages/register/signUp/signUp.js
const app = getApp()
const db = wx.cloud.database()
const DBusers = db.collection("users")
Page({
  data: {
    navTitle: '职工信息管理系统',
    back: true,
    nameAlert: false,
    eidAlert1: false,
    eidAlert2: false,
    pwdAlert1: false,
    pwdAlert2: false,
    inputName: '',
    inputPwd: '',
  },
  bindNameInput: function (e) {
    this.setData({
      inputName: e.detail.value
    })
    if (this.data.inputName.length == 0 || this.data.inputName.length == 1) {
      this.setData({
        nameAlert: false
      })
    }
    else {
      DBusers.where({
        name: this.data.inputName
      })
        .get()
        .then(res => {
          if (res.data.length == 1) {
            this.setData({
              nameAlert: false
            })
          }
          else {
            this.setData({
              nameAlert: true
            })
          }
        })
    }
    console.log("name:" + this.data.inputName, "eid:" + this.data.inputEid, "pwd:" + this.data.inputPwd)
  },
  bindEidInput: function (e) {
    var inputEid = e.detail.value.toString()
    this.setData({
      inputEid: inputEid
    })
    if (this.data.inputEid.length == 6) {
      this.setData({
        eidAlert1: false,
        eidAlert2: false
      })
      // console.log(this.data)
      DBusers.where({
        name: this.data.inputName,
        eid: this.data.inputEid
      })
        .get()
        .then(res => {
          // console.log(res.data.length)
          if (res.data.length == 1) {
            this.setData({
              nameAlert: false,
              eidAlert1: false,
              eidAlert2: false
            })
          }
          else {
            this.setData({
              nameAlert: false
            })
          }
        })
    }
    else if (this.data.inputEid.length == 0) {
      this.setData({
        eidAlert1: false,
        eidAlert2: false
      })
    }
    else {
      this.setData({
        eidAlert1: true,
        eidAlert2: false
      })
    }
    console.log("name:" + this.data.inputName, "eid:" + this.data.inputEid, "pwd:" + this.data.inputPwd)
  },
  bindPwdInput: function (e) {
    var inputPwd = e.detail.value.toString()
    this.setData({
      inputPwd: inputPwd
    })
    console.log("name:" + this.data.inputName, "eid:" + this.data.inputEid, "pwd:" + this.data.inputPwd)
  },
  submitSignup: function (e) {
    var that = this
    let inputName = that.data.inputName
    let inputEid = that.data.inputEid
    let inputPwd = that.data.inputPwd
    DBusers.where({
      name: inputName,
      eid: inputEid
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

  /* 页面相关事件处理函数--监听用户下拉动作 */
  onPullDownRefresh: function () {

  },

  /* 页面上拉触底事件的处理函数 */
  onReachBottom: function () {

  },

  /* 用户点击右上角分享 */
  onShareAppMessage: function () {

  }
})