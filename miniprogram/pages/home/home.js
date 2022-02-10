// pages/home/home.js
const app = getApp()
const db = wx.cloud.database()
const DBusers = db.collection("users")
Page({
  data: {
    navTitle: '职工信息管理系统',
    back: false,
    openid: app.globalData.openid,
    type: 0
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

  // 表单输入处理函数
  onTitleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },

  onDescInput(e) {
    this.setData({
      desc: e.detail.value
    })
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

  // 响应事件状态选择器
  onChooseFreq(e) {
    this.setData({
      freq: e.detail.value
    })
  },

  // 保存待办
  async saveTodo() {
    // 对输入框内容进行校验
    if (this.data.title === '') {
      wx.showToast({
        title: '事项标题未填写',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.data.title.length > 10) {
      wx.showToast({
        title: '事项标题过长',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.data.desc.length > 100) {
      wx.showToast({
        title: '事项描述过长',
        icon: 'error',
        duration: 2000
      })
      return
    }
    const db = await getApp().database()
    // 在数据库中新建待办事项，并填入已编辑对信息
    db.collection(getApp().globalData.collection).add({
      data: {
        title: this.data.title,       // 待办标题
        desc: this.data.desc,         // 待办描述
        files: this.data.files,       // 待办附件列表
        freq: Number(this.data.freq), // 待办完成情况（提醒频率）
        star: false
      }
    }).then(() => {
      wx.navigateBack({
        delta: 0,
      })
    })
  },


  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    this.setData({
      openid: app.globalData.openid
    })
    if (app.globalData.openid.length != 0) {
      DBusers.where({
        openid: app.globalData.openid
      })
        .get()
        .then(res => {
          console.log(res)
          app.globalData.name = res.data[0].name
          app.globalData.eid = res.data[0].eid
          app.globalData.group = res.data[0].group
          app.globalData.type = res.data[0].type

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

  }
})