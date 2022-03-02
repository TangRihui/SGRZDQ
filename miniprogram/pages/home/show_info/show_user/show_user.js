// pages/home/show_info/show_user/show_user.js
const app = getApp()
const db = wx.cloud.database()
const DBusers = db.collection("users")
Page({
    data: {
        navTitle: '班组成员信息',
        back: true,
        openid: app.globalData.openid,
        name: app.globalData.name,
        eid: app.globalData.eid,
        group: app.globalData.group,
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
        first_work: "",
        cer_levelOptions: ['点击选择', '中级工程师', '助理工程师', '助理技师', '五级', '四级', '三级', '二级', '一级'],
        cer_level: 0,
        cer_id: '',
        cer_date: '',
        cer_org: '',
        college: '',
        major: '',
        eduOptions: ['点击选择', '研究生', '大学本科', '大学专科', '专科院校', '中等专业学校', '高级技校', '技校', '高中', '职高', '初中', '小学', '其它'],
        edu: 0,
        degreeOptions: ['点击选择', '博士', '硕士', '学士'],
        degree: 0,
        post_titleOptions: ['点击选择', '高级工程师', '中级工程师', '助理工程师', '首席技师', '主任技师', '主管技师', '高级技师'],
        post_title: 0,
        post_id: '',
    },

    // 「个人信息」表单输入处理函数
    groupInput(e) {
        this.setData({
            userGroup: e.detail.value,
        });
        console.log(this.data.userGroup)
    },
    sexPickerChange(e) {
        this.setData({
            userSex: parseInt(e.detail.value),
        });
        console.log(this.data.sex)
    },
    birthPickerChange(e) {
        this.setData({
            userBirth: e.detail.value,
        });
        console.log(this.data.birth)
    },
    ageInput(e) {
        this.setData({
            userAge: parseInt(e.detail.value),
        });
        console.log(this.data.age)
    },
    nativeInput(e) {
        this.setData({
            userNative: e.detail.value
        });
        console.log(this.data.native)
    },
    addInput(e) {
        this.setData({
            userAdd: e.detail.value
        });
        console.log(this.data.add)
    },
    politicPickerChange(e) {
        this.setData({
            userPolitic: e.detail.value,
        });
        console.log(this.data.politic)
    },
    telInput(e) {
        this.setData({
            userTel: parseInt(e.detail.value),
        });
        console.log(this.data.tel)
    },
    idnoInput(e) {
        this.setData({
            userId_no: e.detail.value
        });
        console.log(this.data.id_no)
    },
    idaddInput(e) {
        this.setData({
            userId_add: e.detail.value
        });
        console.log(this.data.id_add)
    },
    // 「工作信息」表单输入处理函数
    workdatePickerChange(e) {
        this.setData({
            userWork_date: e.detail.value,
        });
        console.log(this.data.work_date)

    },
    arrdatePickerChange(e) {
        this.setData({
            userArr_date: e.detail.value,
        });
        console.log(this.data.arr_date)

    },
    worktypePickerChange(e) {
        this.setData({
            userWork_type: parseInt(e.detail.value),
        });
        console.log(this.data.work_type)

    },
    postPickerChange(e) {
        this.setData({
            userPost: parseInt(e.detail.value),
        });
        console.log(this.data.post)

    },
    posthrPickerChange(e) {
        this.setData({
            userPost_hr: parseInt(e.detail.value),
        });
        console.log(this.data.post_hr)

    },
    postnoPickerChange(e) {
        this.setData({
            userPost_no: parseInt(e.detail.value),
        });
        console.log(this.data.post_no)

    },
    postlevelPickerChange(e) {
        this.setData({
            userPost_level: parseInt(e.detail.value),
        });
        console.log(this.data.post_level)

    },
    firstworkInput(e) {
        this.setData({
            userFirst_work: e.detail.value
        });
        console.log(this.data.first_work)
    },
    // 「证书信息」表单输入处理函数
    cerlevelPickerChange(e) {
        this.setData({
            userCer_level: parseInt(e.detail.value),
        });
        console.log(this.data.cer_level)
    },
    ceridInput(e) {
        this.setData({
            userCer_id: e.detail.value
        });
        console.log(this.data.cer_id)
    },
    cerdatePickerChange(e) {
        this.setData({
            userCer_date: e.detail.value,
        });
        console.log(this.data.cer_date)
    },
    cerorgInput(e) {
        this.setData({
            userCer_org: e.detail.value
        });
        console.log(this.data.cer_org)
    },
    collegeInput(e) {
        this.setData({
            userCollege: e.detail.value
        });
        console.log(this.data.college)
    },
    majorInput(e) {
        this.setData({
            userMajor: e.detail.value
        });
        console.log(this.data.major)
    },
    eduPickerChange(e) {
        this.setData({
            userEdu: parseInt(e.detail.value),
        });
        console.log(this.data.edu)
    },
    degreePickerChange(e) {
        this.setData({
            userDegree: parseInt(e.detail.value),
        });
        console.log(this.data.degree)
    },
    posttitlePickerChange(e) {
        this.setData({
            userPost_title: parseInt(e.detail.value),
        });
        console.log(this.data.post_title)
    },
    postidInput(e) {
        this.setData({
            userPost_id: e.detail.value
        });
        console.log(this.data.post_id)
    },

    submitForm(e) {
        var that = this
        console.log(
            "userName:" + that.data.userName, "userEid:" + that.data.userEid,
            "userGroup:" + that.data.userGroup, "openid:" + app.globalData.openid,
            "sex:" + that.data.userSex, "birth:" + that.data.userBirth,
            "age:" + that.data.userAge, "native:" + that.data.userNative,
            "add:" + that.data.userAdd, "politic:" + that.data.userPolitic,
            "tel:" + that.data.userTel, "id_no:" + that.data.userId_no,
            "id_add:" + that.data.userId_add, "work_date:" + that.data.userWork_date,
            "arr_date:" + that.data.userArr_date, "work_type:" + that.data.userWork_type,
            "post:" + that.data.userPost, "post_hr:" + that.data.userPost_hr,
            "post_no:" + that.data.userPost_no, "post_level:" + that.data.userPost_level,
            "first_work:" + that.data.userPirst_work, "cer_level:" + that.data.userCer_level,
            "cer_id:" + that.data.userCer_id, "cer_date:" + that.data.userCer_date,
            "cer_org:" + that.data.userCer_org, "college:" + that.data.userCollege,
            "major:" + that.data.userMajor, "edu:" + that.data.userEdu,
            "degree:" + that.data.userDegree, "post_title:" + that.data.userPost_title,
            "post_id:" + that.data.userPost_id)
        DBusers.where({
            eid: that.data.userEid
        })
            .update({
                data: {
                    group: that.data.userGroup,
                    sex: that.data.userSex,
                    birth: that.data.userBirth,
                    age: that.data.userAge,
                    native: that.data.userNative,
                    add: that.data.userAdd,
                    politic: that.data.userPolitic,
                    tel: that.data.userTel,
                    id_no: that.data.userId_no,
                    id_add: that.data.userId_add,
                    work_date: that.data.userWork_date,
                    arr_date: that.data.userArr_date,
                    work_type: that.data.userWork_type,
                    post: that.data.userPost,
                    post_hr: that.data.userPost_hr,
                    post_no: that.data.userPost_no,
                    post_level: that.data.userPost_level,
                    first_work: that.data.userFirst_work,
                    cer_level: that.data.userCer_level,
                    cer_id: that.data.userCer_id,
                    cer_date: that.data.userCer_date,
                    cer_org: that.data.userCer_org,
                    college: that.data.userCollege,
                    major: that.data.userMajor,
                    edu: that.data.userEdu,
                    degree: that.data.userDegree,
                    post_title: that.data.userPost_title,
                    post_id: that.data.userPost_id
                }
            })
            .then(res => {
                console.log(res)
                wx.switchTab({
                    url: '../../home',
                    success: function (res) {
                        console.log("班组成员信息更新成功")
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
        console.log(options.userEid)
        var that = this
        that.setData({
            openid: app.globalData.openid,
            name: app.globalData.name,
            eid: app.globalData.eid,
            group: app.globalData.group
        })
        DBusers.where({
            eid: options.userEid
        })
            .get()
            .then(res => {
                console.log(res)
                that.setData({
                    userName: res.data[0].name,
                    userEid: res.data[0].eid,
                    userGroup: res.data[0].group,
                    userSex: res.data[0].sex,
                    userBirth: res.data[0].birth,
                    userAge: res.data[0].age,
                    userNative: res.data[0].native,
                    userAdd: res.data[0].add,
                    userPolitic: res.data[0].politic,
                    userTel: res.data[0].tel,
                    userId_no: res.data[0].id_no,
                    userId_add: res.data[0].id_add,
                    userWork_date: res.data[0].work_date,
                    userArr_date: res.data[0].arr_date,
                    userWork_type: res.data[0].work_type,
                    userPost: res.data[0].post,
                    userPost_hr: res.data[0].post_hr,
                    userPost_no: res.data[0].post_no,
                    userPost_level: res.data[0].post_level,
                    userFirst_work: res.data[0].first_work,
                    userCer_level: res.data[0].cer_level,
                    userCer_id: res.data[0].cer_id,
                    userCer_date: res.data[0].cer_date,
                    userCer_org: res.data[0].cer_org,
                    userCollege: res.data[0].college,
                    userMajor: res.data[0].major,
                    userEdu: res.data[0].edu,
                    userDegree: res.data[0].degree,
                    userPost_title: res.data[0].post_title,
                    userPost_id: res.data[0].post_id,
                })
                console.log(
                    "userName:" + that.data.userName, "userEid:" + that.data.userEid,
                    "userGroup:" + that.data.userGroup, "openid:" + app.globalData.openid,
                    "sex:" + that.data.userSex, "birth:" + that.data.userBirth,
                    "age:" + that.data.userAge, "native:" + that.data.userNative,
                    "add:" + that.data.userAdd, "politic:" + that.data.userPolitic,
                    "tel:" + that.data.userTel, "id_no:" + that.data.userId_no,
                    "id_add:" + that.data.userId_add, "work_date:" + that.data.userWork_date,
                    "arr_date:" + that.data.userArr_date, "work_type:" + that.data.userWork_type,
                    "post:" + that.data.userPost, "post_hr:" + that.data.userPost_hr,
                    "post_no:" + that.data.userPost_no, "post_level:" + that.data.userPost_level,
                    "first_work:" + that.data.userPirst_work, "cer_level:" + that.data.userCer_level,
                    "cer_id:" + that.data.userCer_id, "cer_date:" + that.data.userCer_date,
                    "cer_org:" + that.data.userCer_org, "college:" + that.data.userCollege,
                    "major:" + that.data.userMajor, "edu:" + that.data.userEdu,
                    "degree:" + that.data.userDegree, "post_title:" + that.data.userPost_title,
                    "post_id:" + that.data.userPost_id)
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
                    imageUrl: '../../../../images/logo.jpg',
                })
            }, 500)
        })
        return {
            path: '/page/register/register',
            promise
        }
    }
})