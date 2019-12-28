// pages/list/list.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    in_price: 0,//进货金额
    out_price: 0,//销售金额
    save_price: 0,//库存积压金额
    win_price: 0//盈利金额
  },
  goods_message: function () {
    console.log("message")
    wx.switchTab({
      url: "/pages/goods/goods",
    })
  },
  house: function () {
    console.log("house")
    wx.navigateTo({
      url: "/pages/houselist/houselist",
    })
  },
  sale: function () {
    console.log("sale")
    wx.navigateTo({
      url: "/pages/sale/sale",
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.data.allgoods)
    app.data.in_price=0;//进货金额
    app.data.out_price=0;//销售金额
    app.data.save_price=0;//库存积压金额
    app.data.win_price=0;//盈利金额
    console.log(app.data.allgoods);
    for (var i = 0; i < app.data.allgoods.length; i++) {
      app.data.in_price = app.data.in_price + parseInt(app.data.allgoods[i].price);
    }
    for (var i = 0; i < app.data.salelist[2].length; i++) {
      app.data.out_price = app.data.out_price + parseInt(app.data.salelist[2][i].price) * parseInt(app.data.salelist[2][i].number);
    }
    for (var i = 0; i < app.data.houselist.length; i++) {
      app.data.save_price = app.data.save_price + parseInt(app.data.houselist[i].price);
    }
    for (var i = 0; i < app.data.salelist[2].length; i++) {
      app.data.out_price = app.data.out_price + parseInt(app.data.salelist[2][i].profit);
    }
    this.setData({
      in_price: app.data.in_price,//进货金额
      out_price: app.data.out_price,//销售金额
      save_price: app.data.save_price,//库存积压金额
      win_price: app.data.win_price//盈利金额
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
    this.onLoad();
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