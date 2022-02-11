// pages/home/home.js
const app = getApp()
const db = wx.cloud.database()
const DBusers = db.collection("users")
Page({
  data: {
    navTitle: '职工信息管理系统',
    back: false,
    openid: app.globalData.openid,
    type: app.globalData.type
  },

  personal_info: function (e) {
    wx.navigateTo({
      url: './personal_info/personal_info',
    })
  },
  job_info: function (e) {
    wx.navigateTo({
      url: './job_info/job_info',
    })
  },
  certificate_info: function (e) {
    wx.navigateTo({
      url: './certificate_info/certificate_info',
    })
  },
  show_info: function (e) {
    wx.navigateTo({
      url: './show_info/show_info',
    })
  },

  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    let that = this
    if (app.globalData.openid.length != 0) {
      DBusers.where({
        openid: app.globalData.openid
      })
        .get()
        .then(res => {
          console.log(res)
          app.globalData.openid = res.data[0].openid,
            app.globalData.name = res.data[0].name
          app.globalData.eid = res.data[0].eid
          app.globalData.group = res.data[0].group
          app.globalData.type = res.data[0].type
          that.setData({
            openid: app.globalData.openid,
            name: app.globalData.name,
            eid: app.globalData.eid,
            group: app.globalData.group,
            type: app.globalData.type
          })
        })
    }
    else if (app.globalData.openid.length == 0) {
      wx.showModal({
        title: '登录状态异常',
        content: '请检查网络状态后重新登录',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('无app.globalData.openid')
            wx.navigateTo({
              url: '../register/register',
            })
          }
        }
      })
    }
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

  },

  // 上传新附件
  async addFile() {
    // 限制附件个数
    if (this.data.files.length + 1 > getApp().globalData.fileLimit) {
      wx.showToast({
        title: '数量达到上限',
        icon: 'error',
        duration: 2000
      })
      return
    }
    // 从会话选择文件
    wx.chooseMessageFile({
      count: 1
    }).then(res => {
      const file = res.tempFiles[0]
      // 上传文件至云存储
      getApp().uploadFile(file.name, file.path).then(res => {
        // 追加文件记录，保存其文件名、大小和文件 id
        this.data.files.push({
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2),
          id: res.fileID
        })
        // 更新文件显示
        this.setData({
          files: this.data.files,
          fileName: this.data.fileName + file.name + ' '
        })
      })
    })
  },
})