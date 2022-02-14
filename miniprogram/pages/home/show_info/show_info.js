// pages/home/show_info/show_info.js
const app = getApp()
const db = wx.cloud.database()
const DBusers = db.collection("users")
Page({
    data: {
        navTitle: '班组信息',
        back: true,
        openid: app.globalData.openid,
        dlUrl: ''
    },

    getUrl: function (e) {
    wx.showLoading({
      title: '正在加载中...',
    })
    wx.cloud.callFunction({
      name: "getDB",
      data: {
      },
      complete: res => {
        console.log(res)
        // 下载并预览文件
        let url = res.result.uploadFile.fileID
        let fileName = res.result.dataCVS
        console.log(res, url, fileName)
        let urlSplit1 = new Array()
        let urlSplit2 = new Array()
        urlSplit1 = url.split('/')
        urlSplit2 = urlSplit1[2].split('.')
        // console.log(urlSplit1, urlSplit2)
        let dlUrl = 'https://' + urlSplit2[1] + '.tcb.qcloud.la/' + fileName
        console.log(dlUrl)
        let nameSplit1 = new Array()
        let nameSplit2 = new Array()
        nameSplit1 = fileName.split('-')
        nameSplit2 = nameSplit1[2].split('.')
        console.log(nameSplit2[0])
        this.setData({
          dlUrl: dlUrl,
          creatDate: nameSplit1[1],
          creatTime: nameSplit2[0]
        })
        wx.hideLoading({
          success: (res) => {},
        })
        // wx.cloud.downloadFile({
        //     fileID: url
        //   })
        //   .then(res => {
        //     this.setData({
        //       filePath: res.tempFilePath
        //     })
        //     console.log("获取临时链接成功", res)
        //     var filePath = res.tempFilePath
        //     console.log(res)
            // wx.openDocument({
            //   filePath: filePath,
            //   success: function (res) {
            //     wx.hideLoading({
            //       success: (res) => {console.log('打开文档成功')},
            //     })
            //   },
            //   fail: function (res) {
            //     console.log('打开文档失败', res);
            //   },
            //   complete: function (res) {
            //     console.log(res);
            //   }
            // })
          // })
      }
    })
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