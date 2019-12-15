// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('goods').add({
    data: {
      id: event.id,
      price: event.price,
      carid: event.carid,
      msgText: event.msgText,
      headerImg: event.headerImg,
      siteImg: event.siteImg,
      flag: event.flag,
    }
  })
}