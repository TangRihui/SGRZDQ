// pages/home/personal_info/personal_info.js
const app = getApp()
const db = wx.cloud.database()
const DBusers = db.collection("users")
Page({
  data: {
    navTitle: '个人信息',
    back: true,
    openid: app.globalData.openid,
    // 选择框变量
    sexOptions: ['点击选择', '男', '女'],
    sex: 0,
    birth: '',
    age: '',
    native: '',
    add: '',
    politicOptions: ['点击选择', '党员', '预备党员', '积极分子', '团员', '群众'],
    politic: 0,
    tel: '',
    id_no: '',
    id_add: '',
    name: app.globalData.name,
    eid: app.globalData.eid,
    group: app.globalData.group,
  },

  // 表单输入处理函数
  sexPickerChange(e) {
    this.setData({
      sex: parseInt(e.detail.value),
    });
    console.log(this.data.sex)
  },
  birthPickerChange(e) {
    this.setData({
      birth: e.detail.value,
    });
    console.log(this.data.birth)
  },
  ageInput(e) {
    this.setData({
      age: parseInt(e.detail.value),
    });
    console.log(this.data.age)
  },
  nativeInput(e) {
    this.setData({
      native: e.detail.value
    });
    console.log(this.data.native)
  },
  // 表单输入处理函数
  addInput(e) {
    this.setData({
      add: e.detail.value
    });
    console.log(this.data.add)
  },
  politicPickerChange(e) {
    this.setData({
      politic: e.detail.value,
    });
    console.log(this.data.politic)
  },
  telInput(e) {
    this.setData({
      tel: parseInt(e.detail.value),
    });
    console.log(this.data.tel)
  },
  idnoInput(e) {
    this.setData({
      id_no: e.detail.value
    });
    console.log(this.data.id_no)
  },
  idaddInput(e) {
    this.setData({
      id_add: e.detail.value
    });
    console.log(this.data.id_add)
  },
  submitPersonal(e) {
    var that = this
    console.log(
      "name:" + that.data.name, "eid:" + that.data.eid,
      "group:" + that.data.group, "openid:" + app.globalData.openid,
      "sex:" + that.data.sex, "birth:" + that.data.birth,
      "age:" + that.data.age, "native:" + that.data.native,
      "add:" + that.data.add, "politic:" + that.data.politic,
      "tel:" + that.data.tel, "id_no:" + that.data.id_no,
      "id_add:" + that.data.id_add)
    DBusers.where({
      openid: app.globalData.openid
    })
      .update({
        data: {
          sex: that.data.sex,
          birth: that.data.birth,
          age: that.data.age,
          native: that.data.native,
          add: that.data.add,
          politic: that.data.politic,
          tel: that.data.tel,
          id_no: that.data.id_no,
          id_add: that.data.id_add
        }
      })
      .then(res => {
        console.log(res)
        wx.switchTab({
          url: '../home',
          success: function (res) {
            console.log("个人信息更新成功")
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (res) {
            wx.showModal({
              title: '个人信息保存失败',
              content: '请检查网络状态后重新保存',
              showCancel: false,
            })
          }
        })
      })
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    var that = this
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
          sex: res.data[0].sex,
          birth: res.data[0].birth,
          age: res.data[0].age,
          native: res.data[0].native,
          add: res.data[0].add,
          politic: res.data[0].politic,
          tel: res.data[0].tel,
          id_no: res.data[0].id_no,
          id_add: res.data[0].id_add,
        })
        console.log("sex" + ":" + that.data.sex, "birth" + ":" + that.data.birth,
          "age" + ":" + that.data.age, "native" + ":" + that.data.native,
          "add" + ":" + that.data.add, "politic" + ":" + that.data.politic,
          "tel" + ":" + that.data.tel, "id_no" + ":" + that.data.id_no,
          "id_add" + ":" + that.data.id_add)
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