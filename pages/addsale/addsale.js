// pages/addsale/addsale.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    number: '',
    sale: {}
  },

  input_name: function () {
    wx.hideKeyboard()
    wx.redirectTo({
      url: "/pages/houseslistforselecting/houseslistforselecting",
    })
  },

  input_price: function (in_number) {
    this.setData({
      number: in_number.detail.value
    })
  },

  save: function () {
    this.creatsale(false);
    wx.navigateBack({

    })
  },
  confirm: function () {
    this.creatsale(true);
    app.data.salelist[app.data.workerid + 1].push(this.data.sale)
    wx.navigateBack({

    })
  },
  creatsale: function (state) {
    var i = app.data.salelist[app.data.workerid].length;
    this.data.sale.number = this.data.number;
    this.data.sale.name = this.data.name;
    this.data.sale.id = i;
    this.data.sale.state = state;//false保存，true提交
    app.data.salelist[app.data.workerid].push(this.data.sale);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: app.data.goodname
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