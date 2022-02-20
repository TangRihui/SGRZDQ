// pages/setting/setting.js
const app = getApp()
const db = wx.cloud.database()
const DBusers = db.collection("users")
Page({
  data: {
    navTitle: '职工信息管理系统',
    back: false,
    name: '未登录',
    eid: '信息加载失败',
    group: '请重新进入小程序',
    type: 0,
    types: ['用户', '小班组管理员', '大班组管理员', '系统管理员']
  },
  log_out: function (e) {
    wx.clearStorage()
    app.globalData.openid = ''
    app.globalData.name = ''
    app.globalData.eid = ''
    app.globalData.group = ''
    app.globalData.type = ''
    this.setData({
      data: {
        openid: '',
        name: '',
        eid: '',
        group: '',
        type: 0,
      }
    })
    console.log(this.data, app.globalData)
    wx.navigateTo({
      url: '../register/register?isAutoSignIn=false',
    })
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    console.log(app.globalData.name)
    this.setData({
      name: app.globalData.name,
      eid: app.globalData.eid,
      group: app.globalData.group,
      type: app.globalData.type,
    })
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
          imageUrl: '../../images/logo.jpg',
        })
      }, 500)
    })
    return {
      path: '/page/register/register',
      promise
    }
  }
})