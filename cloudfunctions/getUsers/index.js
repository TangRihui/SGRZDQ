// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: 'sgrzsbgl-7gyn4rque41a73ad' })
const DBusers = cloud.database().collection("users")

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const users = await DBusers.get()
    return {
        users: users,
    }
}