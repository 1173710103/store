// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('house_list').add({
    data: {
      id: event.id,
      name: event.name,
      number: event.number,
      price: event.price,
      list: event.list,
      flag: event.flag
    }
  })
}