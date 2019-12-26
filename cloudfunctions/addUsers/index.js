// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('users').add({
    data: {
      age: event.age,
      carid: event.carid,
      msgText: event.msgText,
      id: event.id,
      headerImg: event.headerImg,
      siteImg: event.siteImg,
      usertype: event.usertype,
      flag: event.flag
    }
  })
}