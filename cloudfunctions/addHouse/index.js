// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('house_list').add({
    data: {
      name: event.name,
      id: event.id,
      number: event.number,
      price: event.price,
      totalprice:event.totalprice,
      list: event.list,
      flag: event.flag
    }
  })
}