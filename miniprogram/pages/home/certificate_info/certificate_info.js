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
    cer_date: '2020-01-01',
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
    first_work: ''
  },
  // 表单输入处理函数
  cerlevelPickerChange(e) {
    this.setData({
      cer_level: e.detail.value,
    });
  },
  ceridInput(e) {
    this.setData({
      cer_id: e.detail.value
    });
  },
  cerdatePickerChange(e) {
    this.setData({
      cer_date: e.detail.value,
    });
  },
  cerorgInput(e) {
    this.setData({
      cer_org: e.detail.value
    });
  },
  // 表单输入处理函数
  collegeInput(e) {
    this.setData({
      college: e.detail.value
    });
  },
  majorInput(e) {
    this.setData({
      major: e.detail.value
    });
  },
  eduPickerChange(e) {
    this.setData({
      edu: e.detail.value,
    });
  },
  degreePickerChange(e) {
    this.setData({
      degree: e.detail.value,
    });
  },
  // 表单输入处理函数
  posttitlePickerChange(e) {
    this.setData({
      post_title: e.detail.value,
    });
  },
  postidInput(e) {
    this.setData({
      post_id: e.detail.value
    });
  },
  submitCertificate(e) {
    console.log("cer_level" + ":" + this.data.cer_level, "cer_id" + ":" + this.data.cer_id,
      "cer_date" + ":" + this.data.cer_date, "cer_org" + ":" + this.data.cer_org,
      "college" + ":" + this.data.college, "major" + ":" + this.data.major,
      "edu" + ":" + this.data.edu, "degree" + ":" + this.data.degree,
      "post_title" + ":" + this.data.post_title, "post_id" + ":" + this.data.post_id)

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