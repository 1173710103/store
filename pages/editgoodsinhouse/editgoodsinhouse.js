// pages/editgoodsinhouse/editgoodsinhouse.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    price: '',
    number:''
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

  input_number: function (in_number) {
    this.setData({
      number: in_number.detail.value
    })
  },

  confirm: function () {
    app.data.houselist[app.data.houseid].list[app.data.goodsinhouse_id].price = this.data.price;
    app.data.houselist[app.data.houseid].list[app.data.goodsinhouse_id].carid = this.data.name;
    app.data.houselist[app.data.houseid].list[app.data.goodsinhouse_id].number = this.data.number;
    wx.navigateBack({

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(app.data.goodsinhouse_id)
    this.setData({
      name: app.data.houselist[app.data.houseid].list[app.data.goodsinhouse_id].carid,
      price: app.data.houselist[app.data.houseid].list[app.data.goodsinhouse_id].price,
      number: app.data.houselist[app.data.houseid].list[app.data.goodsinhouse_id].number
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