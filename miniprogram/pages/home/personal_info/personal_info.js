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
        birthOptions: '',
        birth: '',
        age: '',
        politicOptions: ['点击选择', '党员', '预备党员', '积极分子', '团员', '群众'],
        politic: 0,
        native: '',
        dateOptions: '',
        freqOptions: ['选择框', '女'],
        freq: 0,
        name: 'name',
        eid: 'eid',
        group: 'group'
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})