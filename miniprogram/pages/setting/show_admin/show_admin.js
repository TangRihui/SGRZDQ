// pages/setting/show_admin/show_admin.js
const app = getApp()
const db = wx.cloud.database()
const DBusers = db.collection("users")
Page({
    data: {
        navTitle: '信息去向',
        back: true,
        openid: app.globalData.openid,
        dlUrl: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        var group = app.globalData.group
        var adminInfo = []
        if (group == '轧钢甲班' || group == '轧钢乙班' || group == '轧钢丙班' || group == '轧钢丁班') {
            db.collection('users').where({ type: 3 }).get().then(res => {
                adminInfo = adminInfo.concat(res.data)

                db.collection('users').where({ group: '轧钢班', type: 2 }).get().then(res => {
                    adminInfo = adminInfo.concat(res.data)

                    db.collection('users').where({ group: group, type: 1 }).get().then(res => {
                        adminInfo = adminInfo.concat(res.data)
                        that.setData({
                            adminInfo: adminInfo
                        })
                    })
                })
            })
        }
        else if (group == '加热甲班' || group == '加热乙班' || group == '加热丙班' || group == '加热丁班') {
            db.collection('users').where({ type: 3 }).get().then(res => {
                adminInfo = adminInfo.concat(res.data)

                db.collection('users').where({ group: '加热班', type: 2 }).get().then(res => {
                    adminInfo = adminInfo.concat(res.data)

                    db.collection('users').where({ group: group, type: 1 }).get().then(res => {
                        adminInfo = adminInfo.concat(res.data)
                        that.setData({
                            adminInfo: adminInfo
                        })
                    })
                })
            })
        }

        else if (group == '轧钢班' || group == '加热班') {
            db.collection('users').where({ type: 3 }).get().then(res => {
                adminInfo = adminInfo.concat(res.data)

                db.collection('users').where({ group: group, type: 2 }).get().then(res => {
                    adminInfo = adminInfo.concat(res.data)
                    that.setData({
                        adminInfo: adminInfo
                    })
                })
            })
        }

        else if (group == '机长' || group == '技术组' || group == '综合组' || group == '实习' || group == '测试') {
            db.collection('users').where({ type: 3 }).get().then(res => {
                adminInfo = adminInfo.concat(res.data)
                that.setData({
                    adminInfo: adminInfo
                })
            })
        }
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