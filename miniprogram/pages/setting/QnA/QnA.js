// pages/setting/QnA/QnA.js
const app = getApp()
const db = wx.cloud.database()
const DBusers = db.collection("users")
Page({
  data: {
    navTitle: '常见问题',
    back: true,
    openid: app.globalData.openid,
    showIndex: 0,
    signs: [{
      'title': '使用微信账号登录',
      'content': '在首次注册系统账号时，该系统账号会与当前使用的微信账号绑定，在后续启动小程序时将自动完成登录。如需登录他人系统账号，可在「设置」页面点击「退出登录」按钮后，点击「使用密码登录」。'
    },
    {
      'title': '使用密码登录',
      'content': '密码登录'
    },
    {
      'title': '未预约用户入馆',
      'content': '前往图书馆内放置的选座机查看可选座位，选座成功后请在预约成功后15分钟内到达门禁处刷校园卡或人脸识别进入图书馆，超时将自动取消该预定，并扣除信誉分。'
    },
    {
      'title': '出馆方式',
      'content': '在预约时间段结束前后15分钟内到达出口门禁处刷校园卡或人脸识别出馆。若门禁出现错误，请联系图书馆工作人员。'
    }
    ],
    infos: [{
      'title': '签到',
      'content': '在预约时间开始后15分钟内到达预约教室并完成扫码签到，超时将自动取消该预定，并扣除信誉分。'
    },
    {
      'title': '签到失败',
      'content': '若签到出现技术问题，请点击“我的”页面——>“问题反馈”——>“功能异常”——>“其他异常”进行反馈。若因网络问题无法签到，请点击“我的”页面——>“联系我们”联系客服解决。'
    }
    ],
    admins: [{
      'title': '签到',
      'content': '在预约时间开始后15分钟内到达预约教室并完成扫码签到，超时将自动取消该预定，并扣除信誉分。'
    },
    {
      'title': '签到失败',
      'content': '若签到出现技术问题，请点击“我的”页面——>“问题反馈”——>“功能异常”——>“其他异常”进行反馈。若因网络问题无法签到，请点击“我的”页面——>“联系我们”联系客服解决。'
    }
    ],
    errors: [
      {
        'title': '签到失败',
        'content': '若签到出现技术问题，请点击“我的”页面——>“问题反馈”——>“功能异常”——>“其他异常”进行反馈。若因网络问题无法签到，请点击“我的”页面——>“联系我们”联系客服解决。'
      },
    ],
  },
  panel: function (e) {
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        showIndex: 0
      })
    }
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    let that = this
    that.setData({
      type: app.globalData.type
    })
    console.log(app.globalData.type)

    console.log(that.data.type)
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