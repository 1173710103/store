// pages/editsale/editsale.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    number: '',
    sale:{}
  },

  input_name: function (in_name) {
    this.setData({
      name: in_name.detail.value
    })
  },

  input_price: function (in_numner) {
    this.setData({
      number: in_numner.detail.value
    })
  },

  save: function () {
    this.creatsale(false);
    wx.navigateBack({

    })
  },
  confirm: function () {
    app.data.salelist[app.data.workerid][app.data.saleid].state = true;
    app.data.salelist[app.data.workerid + 1].push(app.data.salelist[app.data.workerid][app.data.saleid])
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
  onLoad: function (option) {
    this.setData({
      name: app.data.salelist[app.data.workerid][app.data.saleid].name,
      number: app.data.salelist[app.data.workerid][app.data.saleid].number
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