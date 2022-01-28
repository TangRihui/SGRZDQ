// pages/home/job_info/job_info.js
const app = getApp()
const db = wx.cloud.database()
const DBusers = db.collection("users")
Page({
  data: {
    navTitle: '工作信息',
    back: true,
    name: app.globalData.name,
    eid: app.globalData.eid,
    group: app.globalData.group,
    work_date: '2020-01-01',
    arr_date: '2020-01-01',
    work_typeOptions: ['点击选择', '轧制原料工', '金属轧制工'],
    work_type: 0,
    postOptions: ['点击选择', '机长', '安全员', '加热工', '粗轧工', '精轧工', '卷取工'],
    post: 0,
    post_hrOptions: ['点击选择', '主任', '书记', '副主任', '技术（业务）主管', '机长', '安全员', '加热工', '粗轧工', '精轧工', '卷取工'],
    post_hr: 0,
    post_noOptions: ['点击选择', '管理', '技术主管', '技术', '操作', '实习'],
    post_no: 0,
    post_levelOptions: ['点击选择', '五岗', '六岗', '七岗', '八岗', '九岗'],
    post_level: 0,
    first_work: ""
  },
  // 表单输入处理函数
  workdatePickerChange(e) {
    this.setData({
      work_date: e.detail.value,
    });
  },
  arrdatePickerChange(e) {
    this.setData({
      arr_date: e.detail.value,
    });
  },
  worktypePickerChange(e) {
    this.setData({
      work_type: e.detail.value,
    });
  },
  postPickerChange(e) {
    this.setData({
      post: e.detail.value,
    });
  },
  posthrPickerChange(e) {
    this.setData({
      post_hr: e.detail.value,
    });
  },
  postnoPickerChange(e) {
    this.setData({
      post_no: e.detail.value,
    });
  },
  postlevelPickerChange(e) {
    this.setData({
      post_level: e.detail.value,
    });
  },
  firstworkInput(e) {
    this.setData({
      first_work: e.detail.value
    });
  },
  submitJob(e) {
    console.log("work_date" + ":" + this.data.work_date, "arr_date" + ":" + this.data.arr_date,
      "work_type" + ":" + this.data.work_type, "post" + ":" + this.data.post,
      "post_hr" + ":" + this.data.post_hr, "post_no" + ":" + this.data.post_no,
      "post_level" + ":" + this.data.post_level, "first_work" + ":" + this.data.first_work)

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