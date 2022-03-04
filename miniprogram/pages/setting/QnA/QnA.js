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
    signs: [
      {
        'title': '注册',
        'content': '在首次注册系统账号时，该系统账号会与当前使用的微信账号绑定，在后续启动小程序时将自动完成登录。'
      },
      {
        'title': '微信账号自动登录',
        'content': '使用注册时登录的微信账号时，小程序将在启动后自动完成登录。'
      },
      {
        'title': '登录他人账号',
        'content': '如小程序未登录，点击「使用密码登录」；如小程序已登录，可在「设置」页面点击「退出登录」按钮后，点击「使用密码登录」。'
      },
    ],
    infos: [{
      'title': '保存前必须填写所有信息吗？',
      'content': '无需全部填写，填写过程中可随时点击「保存」按钮保存已填信息。'
    },
    {
      'title': '谁能看到我填写的信息？',
      'content': '在「设置」页面点击「信息去向」按钮，小程序会展示可获取您填写信息的管理员名单。'
    },
    {
      'title': '您对您的个人信息有哪些权利和选择？',
      'content': '我们尊重您的隐私权，以及您对您的个人信息的控制能力。对于您的个人信息，您拥有以下权利和选择：知情权、限制与拒绝权、查阅和复制权、转移权、更正权、删除权、撤回同意（限于我们基于同意处理个人信息的情形）、注销账号、投诉或采取其他维护您合法权利的途径。详情请阅读《隐私政策》。'
    }
    ],
    admins: [
    {
      'title': '我能对班组成员的信息进行什么操作？',
      'content': '在「首页」页面点击「查看班组信息」按钮，点击上方「导出班组成员信息」按钮，可导出包含全班组成员的信息的excel表格；点击下方列表中班组成员的姓名，可查看和修改指定成员的信息（姓名与工号不可修改）。'
    }
    ],
    errors: [
      {
        'title': '注册/登录/提交失败',
        'content': '请根据弹窗提示操作，如出现技术问题，请点击“设置”页面——>“问题反馈”——>“功能异常”——>“其他异常”进行反馈。'
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