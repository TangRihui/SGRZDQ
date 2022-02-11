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
    work_date: '',
    arr_date: '',
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
    console.log(this.data.work_date)

  },
  arrdatePickerChange(e) {
    this.setData({
      arr_date: e.detail.value,
    });
    console.log(this.data.arr_date)

  },
  worktypePickerChange(e) {
    this.setData({
      work_type: parseInt(e.detail.value),
    });
    console.log(this.data.work_type)

  },
  postPickerChange(e) {
    this.setData({
      post: parseInt(e.detail.value),
    });
    console.log(this.data.post)

  },
  posthrPickerChange(e) {
    this.setData({
      post_hr: parseInt(e.detail.value),
    });
    console.log(this.data.post_hr)

  },
  postnoPickerChange(e) {
    this.setData({
      post_no: parseInt(e.detail.value),
    });
    console.log(this.data.post_no)

  },
  postlevelPickerChange(e) {
    this.setData({
      post_level: parseInt(e.detail.value),
    });
    console.log(this.data.post_level)

  },
  firstworkInput(e) {
    this.setData({
      first_work: e.detail.value
    });
    console.log(this.data.first_work)

  },
  submitJob(e) {
    let that = this
    console.log(
      "work_date:" + that.data.work_date, "arr_date:" + that.data.arr_date,
      "work_type:" + that.data.work_type, "post:" + that.data.post,
      "post_hr:" + that.data.post_hr, "post_no:" + that.data.post_no,
      "post_level:" + that.data.post_level, "first_work:" + that.data.first_work)
    DBusers.where({
      openid: app.globalData.openid
    })
      .update({
        data: {
          work_date: that.data.work_date,
          arr_date: that.data.arr_date,
          work_type: that.data.work_type,
          post: that.data.post,
          post_hr: that.data.post_hr,
          post_no: that.data.post_no,
          post_level: that.data.post_level,
          first_work: that.data.first_work
        }
      })
      .then(res => {
        console.log(res)
        wx.switchTab({
          url: '../home',
          success: function (res) {
            console.log("工作信息更新成功")
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (res) {
            wx.showModal({
              title: '工作信息保存失败',
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
          work_date: res.data[0].work_date,
          arr_date: res.data[0].arr_date,
          work_type: res.data[0].work_type,
          post: res.data[0].post,
          post_hr: res.data[0].post_hr,
          post_no: res.data[0].post_no,
          post_level: res.data[0].post_level,
          first_work: res.data[0].first_work,
        })
        console.log("work_date" + ":" + that.data.work_date, "arr_date" + ":" + that.data.arr_date,
          "work_type" + ":" + that.data.work_type, "post" + ":" + that.data.post,
          "post_hr" + ":" + that.data.post_hr, "post_no" + ":" + that.data.post_no,
          "post_level" + ":" + that.data.post_level, "first_work" + ":" + that.data.first_work)
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