// pages/editgoods/editgoods.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    name:'',
    price:'',
  },

  input_name: function (in_name) {
    this.setData({
      name: in_name.detail.value
    })
  },

  input_price: function (in_price) {
    this.setData({
      price: in_price.detail.value
    })
  },

  confirm: function () {
    app.data.list_goods[app.data.good_id].price = this.data.price;
    app.data.list_goods[app.data.good_id].carid = this.data.name;
    wx.navigateBack({

    })

    wx.cloud.callFunction({
      // 云函数名称 
      name: 'deleteGoods',
      // 传给云函数的参数 
      success: function () {
        console.log("删除成功")

        const db = wx.cloud.database()
        for (var i = app.data.list_goods.length - 1; i >= 0; i--) {
          db.collection('goods').add({
            data: {
              id: app.data.list_goods[i].id,
              price: app.data.list_goods[i].price,
              carid: app.data.list_goods[i].carid,
              msgText: app.data.list_goods[i].msgText,
              headerImg: app.data.list_goods[i].headerImg,
              siteImg: app.data.list_goods[i].siteImg,
              flag: true
            },
            success: res => {
              console.log("插入成功");
            }
          })
        }
      },
      fail: console.error
    }) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.setData({
      name: app.data.list_goods[app.data.good_id].carid,
      price: app.data.list_goods[app.data.good_id].price
    })
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