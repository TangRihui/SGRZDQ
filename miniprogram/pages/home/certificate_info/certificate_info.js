// pages/home/certificate_info/certificate_info.js
const app = getApp()
const db = wx.cloud.database()
const DBusers = db.collection("users")
Page({
  data: {
    navTitle: '证书信息',
    back: true,
    name: app.globalData.name,
    eid: app.globalData.eid,
    group: app.globalData.group,
    cer_levelOptions: ['点击选择', '中级工程师', '助理工程师', '助理技师', '五级', '四级', '三级', '二级', '一级'],
    cer_level: 0,
    cer_id: '',
    cer_date: '',
    cer_org: '',
    college: '',
    major: '',
    eduOptions: ['点击选择', '研究生', '大学本科'],
    edu: 0,
    degreeOptions: ['点击选择', '博士', '硕士', '学士'],
    degree: 0,
    post_titleOptions: ['点击选择', '高级工程师', '中级工程师', '助理工程师', '首席技师', '主任技师', '主管技师', '高级技师'],
    post_title: 0,
    post_id: '',
  },
  // 表单输入处理函数
  cerlevelPickerChange(e) {
    this.setData({
      cer_level: parseInt(e.detail.value),
    });
    console.log(this.data.cer_level)
  },
  ceridInput(e) {
    this.setData({
      cer_id: e.detail.value
    });
    console.log(this.data.cer_id)
  },
  cerdatePickerChange(e) {
    this.setData({
      cer_date: e.detail.value,
    });
    console.log(this.data.cer_date)
  },
  cerorgInput(e) {
    this.setData({
      cer_org: e.detail.value
    });
    console.log(this.data.cer_org)
  },
  // 表单输入处理函数
  collegeInput(e) {
    this.setData({
      college: e.detail.value
    });
    console.log(this.data.college)
  },
  majorInput(e) {
    this.setData({
      major: e.detail.value
    });
    console.log(this.data.major)
  },
  eduPickerChange(e) {
    this.setData({
      edu: parseInt(e.detail.value),
    });
    console.log(this.data.edu)
  },
  degreePickerChange(e) {
    this.setData({
      degree: parseInt(e.detail.value),
    });
    console.log(this.data.degree)
  },
  // 表单输入处理函数
  posttitlePickerChange(e) {
    this.setData({
      post_title: parseInt(e.detail.value),
    });
    console.log(this.data.post_title)
  },
  postidInput(e) {
    this.setData({
      post_id: e.detail.value
    });
    console.log(this.data.post_id)
  },
  submitCertificate(e) {
    let that = this
    console.log("cer_level:" + that.data.cer_level, "cer_id:" + that.data.cer_id,
      "cer_date:" + that.data.cer_date, "cer_org:" + that.data.cer_org,
      "college:" + that.data.college, "major:" + that.data.major,
      "edu:" + that.data.edu, "degree:" + that.data.degree,
      "post_title:" + that.data.post_title, "post_id:" + that.data.post_id)
    DBusers.where({
      openid: app.globalData.openid
    })
      .update({
        data: {
          cer_level: that.data.cer_level, 
          cer_id: that.data.cer_id,
          cer_date: that.data.cer_date,
          cer_org: that.data.cer_org,
          college: that.data.college,
          major: that.data.major,
          edu: that.data.edu,
          degree: that.data.degree,
          post_title: that.data.post_title,
          post_id: that.data.post_id
        }
      })
      .then(res => {
        console.log(res)
        wx.switchTab({
          url: '../home',
          success: function (res) {
            console.log("证书信息更新成功")
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (res) {
            wx.showModal({
              title: '证书信息保存失败',
              content: '请检查网络状态后重新保存',
              showCancel: false,
            })
          }
        })
      })
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    let that = this
    that.setData({
      openid: app.globalData.openid,
      name: app.globalData.name,
      eid: app.globalData.eid,
      group: app.globalData.group
    })
    console.log(app.globalData.openid, that.data.openid)
    DBusers.where({
      openid: that.data.openid
    })
      .get()
      .then(res => {
        console.log(res)
        that.setData({
          cer_level: res.data[0].cer_level,
          cer_id: res.data[0].cer_id,
          cer_date: res.data[0].cer_date,
          cer_org: res.data[0].cer_org,
          college: res.data[0].college,
          major: res.data[0].major,
          edu: res.data[0].edu,
          degree: res.data[0].degree,
          post_title: res.data[0].post_title,
          post_id: res.data[0].post_id,
        })
        console.log("cer_level" + ":" + that.data.cer_level, "cer_id" + ":" + that.data.cer_id,
          "cer_date" + ":" + that.data.cer_date, "cer_org" + ":" + that.data.cer_org,
          "college" + ":" + that.data.college, "major" + ":" + that.data.major,
          "edu" + ":" + that.data.post_level, "degree" + ":" + that.data.first_work,
          "post_title" + ":" + that.data.post_title, "post_id" + ":" + that.data.post_id)
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

  }
})