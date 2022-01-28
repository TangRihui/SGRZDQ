// pages/home/personal_info/personal_info.js
const app = getApp()
const db = wx.cloud.database()
const DBusers = db.collection("users")
Page({
  data: {
    navTitle: '个人信息',
    back: true,
    openid: app.globalData.openid,
    // 保存编辑中待办的信息
    title: '',
    desc: '',
    files: [],
    fileName: '',
    // 选择框变量
    sexOptions: ['点击选择', '男', '女'],
    sex: 0,
    birth: '1980-01-01',
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
      sex: e.detail.value,
    });
  },
  birthPickerChange(e) {
    this.setData({
      birth: e.detail.value,
    });
  },
  ageInput(e) {
    this.setData({
      age: e.detail.value
    });
  },
  nativeInput(e) {
    this.setData({
      native: e.detail.value
    });
  },
  // 表单输入处理函数
  addInput(e) {
    this.setData({
      add: e.detail.value
    });
  },
  politicPickerChange(e) {
    this.setData({
      politic: e.detail.value,
    });
  },
  telInput(e) {
    this.setData({
      tel: e.detail.value
    });
  },
  idnoInput(e) {
    this.setData({
      id_no: e.detail.value
    });
  },
  idaddInput(e) {
    this.setData({
      id_add: e.detail.value
    });
  },
  submitPersonal(e) {
    console.log("sex"+":"+this.data.sex, "birth"+":"+this.data.birth, 
    "age"+":"+this.data.age, "native"+":"+this.data.native, 
    "add"+":"+this.data.add, "politic"+":"+this.data.politic, 
    "tel"+":"+this.data.tel, "id_no"+":"+this.data.id_no, 
    "id_add"+":"+this.data.id_add)

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