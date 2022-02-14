// pages/register/signUp/signUp.js
const app = getApp()
const db = wx.cloud.database()
const DBusers = db.collection("users")
Page({
  data: {
    navTitle: '职工信息管理系统',
    back: true,
    nameAlert: false,
    eidAlert1: false,
    eidAlert2: false,
    pwdAlert1: false,
    pwdAlert2: false,
    inputName: '',
    inputEid: '',
    inputPwd: '',
    inputPwdCheck: '',
  },
  bindNameInput: function (e) {
    var that = this
    that.setData({
      inputName: e.detail.value
    })
    if (that.data.inputName.length == 0 || that.data.inputName.length == 1) {
      that.setData({
        nameAlert: false
      })
    }
    else {
      console.log(that.data.inputName, that.data.inputEid)
      if (that.data.inputEid.length == 0) {
        DBusers.where({
          name: that.data.inputName
        })
          .get()
          .then(res => {
            if (res.data.length == 0) {
              that.setData({
                nameAlert: true
              })
            }
            else if (res.data.length == 1) {
              that.setData({
                nameAlert: false
              })
            }
          })
      }
      else if (that.data.inputEid.length == 6) {
        DBusers.where({
          name: that.data.inputName
        })
          .get()
          .then(res => {
            if (res.data.length == 1) {
              that.setData({
                nameAlert: false
              })
              DBusers.where({
                name: that.data.inputName,
                eid: that.data.inputEid
              })
                .get()
                .then(res => {
                  if (res.data.length == 1) {
                    that.setData({
                      nameAlert: false,
                      eidAlert1: false,
                      eidAlert2: false
                    })
                  }
                  else {
                    that.setData({
                      eidAlert2: true
                    })
                  }
                })
            }
            else {
              if (that.data.inputEid.length == 6) {
                that.setData({
                  nameAlert: true,
                  eidAlert2: true
                })
              }
              else {
                that.setData({
                  nameAlert: true
                })
              }
            }
          })
      }
      else if (that.data.inputEid.length == 6) {
      }
    }
    console.log("name:" + that.data.inputName, "eid:" + that.data.inputEid, "pwd:" + that.data.inputPwd, "pwdCheck:" + that.data.inputPwdCheck)
  },
  bindEidInput: function (e) {
    var that = this
    var inputEid = e.detail.value.toString()
    var inputName = that.data.inputName
    that.setData({
      inputEid: inputEid
    })
    if (inputName == '' || inputName == "" || inputName.length == 0 || inputName.length == 1) {
      that.setData({
        nameAlert: true
      })
    }
    if (that.data.inputEid.length == 6) {
      that.setData({
        eidAlert1: false,
        eidAlert2: false
      })
      // console.log(that.data)
      DBusers.where({
        name: that.data.inputName,
        eid: that.data.inputEid
      })
        .get()
        .then(res => {
          // console.log(res.data.length)
          if (res.data.length == 1) {
            that.setData({
              nameAlert: false,
              eidAlert1: false,
              eidAlert2: false
            })
          }
          else {
            that.setData({
              eidAlert2: true
            })
          }
        })
    }
    else if (that.data.inputEid.length == 0) {
      that.setData({
        eidAlert1: false,
        eidAlert2: false
      })
    }
    else {
      that.setData({
        eidAlert1: true,
        eidAlert2: false
      })
    }
    console.log("name:" + that.data.inputName, "eid:" + that.data.inputEid, "pwd:" + that.data.inputPwd, "pwdCheck:" + that.data.inputPwdCheck)
  },
  bindPwdInput: function (e) {
    var that = this
    var inputPwd = e.detail.value.toString()
    that.setData({
      inputPwd: inputPwd
    })
    if (that.data.inputPwdCheck.length == 0) {
    }
    else if (that.data.inputPwdCheck.length > 0) {
      if (that.data.inputPwd == that.data.inputPwdCheck) {
        console.log(1)
        that.setData({
          pwdAlert2: false
        })
      }
      else {
        console.log(2)
        that.setData({
          pwdAlert2: true
        })
      }
    }
    if (that.data.inputPwd.length >= 4 || that.data.inputPwd.length == 0) {
      that.setData({
        pwdAlert1: false,
      })
    }
    else {
      that.setData({
        pwdAlert1: true,
      })
    }

    console.log("name:" + that.data.inputName, "eid:" + that.data.inputEid, "pwd:" + that.data.inputPwd, "pwdCheck:" + that.data.inputPwdCheck)
  },
  bindPwdCheck: function (e) {
    var that = this
    var inputPwdCheck = e.detail.value.toString()
    var inputPwd = that.data.inputPwd
    that.setData({
      inputPwdCheck: inputPwdCheck
    })
    if (that.data.inputPwdCheck.length == 0) {
      that.setData({
        pwdAlert2: false
      })
    }
    else {
      if (that.data.inputPwd == that.data.inputPwdCheck) {
        that.setData({
          pwdAlert2: false,
        })
      }
      else {
        that.setData({
          pwdAlert2: true,
        })
      }
    }

    console.log("name:" + that.data.inputName, "eid:" + that.data.inputEid, "pwd:" + that.data.inputPwd, "pwdCheck:" + that.data.inputPwdCheck)
  },
  submitSignup: function (e) {
    var that = this
    let inputName = that.data.inputName
    let inputEid = that.data.inputEid
    let inputPwd = that.data.inputPwd
    let inputPwdCheck = that.data.inputPwdCheck
    console.log(inputName, inputEid, inputPwd, inputPwdCheck)
    if (that.data.nameAlert || that.data.eidAlert1 || that.data.eidAlert2 || that.data.pwdAlert1 || that.data.pwdAlert2) {
      if (that.data.nameAlert) {
        wx.showModal({
          title: '姓名填写有误',
          content: '请确认后再次提交',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('姓名填写有误')
            }
          }
        })
      }
      else if (that.data.eidAlert1) {
        wx.showModal({
          title: '工号填写有误',
          content: '请确认后再次提交',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('工号填写有误')
            }
          }
        })
      }
      else if (that.data.eidAlert2) {
        wx.showModal({
          title: '姓名与工号不匹配',
          content: '请确认后再次提交',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('姓名与工号不匹配')
            }
          }
        })
      }
      else if (that.data.pwdAlert1) {
        wx.showModal({
          title: '登录密码至少为4位',
          content: '请确认后再次提交',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('登录密码至少为4位')
            }
          }
        })
      }
      else if (that.data.pwdAlert2) {
        wx.showModal({
          title: '两次输入密码不一致',
          content: '请确认后再次提交',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('两次输入密码不一致')
            }
          }
        })
      }
      else {
        wx.showModal({
          title: '系统错误',
          content: 'Alert识别错误',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('Alert识别错误')
            }
          }
        })
      }
    }
    if (inputName == '' || inputName == "" || inputEid == '' || inputEid == "" || inputPwd == '' || inputPwd == "" || inputPwdCheck == '' || inputPwdCheck == "") {
      if (inputName == '' || inputName == "") {
        wx.showModal({
          title: '“姓名”不得为空',
          content: '请确认后再次提交',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('“姓名”不得为空')
            }
          }
        })
      }
      else if (inputEid == '' || inputEid == "") {
        wx.showModal({
          title: '“工号”不得为空',
          content: '请确认后再次提交',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('“工号”不得为空')
            }
          }
        })
      }
      else if (inputPwd == '' || inputPwd == "") {
        wx.showModal({
          title: '“密码”不得为空',
          content: '请确认后再次提交',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('“密码”不得为空')
            }
          }
        })
      }
      else if (inputPwdCheck == '' || inputPwdCheck == "") {
        wx.showModal({
          title: '“确认密码”不得为空',
          content: '请确认后再次提交',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('“确认密码”不得为空')
            }
          }
        })
      }
      else {
        wx.showModal({
          title: '系统错误',
          content: '“是否为空”识别错误',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('“是否为空”识别错误')
            }
          }
        })
      }
    }
    else {
      console.log("表单初次判断完成")
      DBusers.where({
        name: inputName,
        eid: inputEid
      })
        .get()
        .then(res => {
          console.log(res.data.length, res.data[0])
          that.setData({
            docId: res.data[0]._id
          })
          if (res.data.length == 0) {
            wx.showModal({
              title: '姓名与工号不匹配',
              content: '请确认姓名、工号后再次提交注册',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('注册失败提示，姓名与工号不匹配')
                }
              }
            })
          }
          else if (res.data.length == 1) {
            if (res.data[0].openid == '') {
              if (that.data.inputPwd.length >= 4 && that.data.inputPwdCheck.length >= 4) {
                if (that.data.inputPwd == that.data.inputPwdCheck) {
                  DBusers.where({
                    openid: app.globalData.openid
                  })
                    .get()
                    .then(res => {
                      console.log(res)
                      if (res.data.length == 1) {
                        wx.showModal({
                          title: '微信账号已存在',
                          content: '只能使用该微信账号注册一个系统账号',
                          showCancel: false,
                          success: function (res) {
                            if (res.confirm) {
                              console.log('微信账号已存在')
                            }
                          }
                        })
                      }
                      else if (res.data.length == 0) {
                        DBusers.doc(that.data.docId)
                          .update({
                            data: {
                              pwd: that.data.inputPwd,
                              openid: app.globalData.openid
                            }
                          })
                          .then(res => {
                            console.log(res)
                            app.globalData.name = res.data[0].name
                            app.globalData.eid = res.data[0].eid
                            app.globalData.group = res.data[0].group
                          })
                        wx.switchTab({
                          url: '../../home/home',
                          success: function (res) {
                            wx.showToast({
                              title: '注册成功',
                              icon: 'success',
                              duration: 1500
                            })
                          }
                        })
                      }
                      else {
                        wx.showModal({
                          title: '系统错误',
                          content: '数据库中存在重复的openid',
                          showCancel: false,
                          success: function (res) {
                            if (res.confirm) {
                              console.log('数据库中存在重复的openid')
                            }
                          }
                        })
                      }
                    })
                }
                else {
                  wx.showModal({
                    title: '两次输入密码不同',
                    content: '请确认密码后再次注册',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        console.log('注册失败提示，两次输入密码不同')
                      }
                    }
                  })
                }
              }
              else {
                wx.showModal({
                  title: '密码至少为4位',
                  content: '请确认密码后再次注册',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      console.log('注册失败提示，密码至少为4位')
                    }
                  }
                })
              }
            }
            else {
              wx.showModal({
                title: '用户信息不完整',
                content: '请先完成账户注册',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: './signUp/signUp',
                    })
                    console.log('用户信息不完整')
                  }
                }
              })
            }
          }
          else {
            wx.showModal({
              title: '注册失败',
              content: '请确认网络正常后再次注册，或联系管理员',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('注册失败提示，系统错误（网络？）')
                }
              }
            })
          }
        })
    }
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