// pages/addsale/addsale.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    number: '',
    price:'',
    sale: {},
    houseselectedid:0,
    goodselected:{}
  },

  input_name: function () {
    wx.hideKeyboard()
    wx.redirectTo({
      url: "/pages/houseslistforselecting/houseslistforselecting",
    })
  },

  input_number: function (in_number) {
    this.setData({
      number: in_number.detail.value
    })
  },

  input_price: function (in_price) {
    this.setData({
      price: in_price.detail.value
    })
  },

  save: function () {
    this.creatsale(0);
    app.data.salelist[app.data.workerid][app.data.salelist[app.data.workerid].length - 1].profit = (this.data.sale.price - app.data.goodselected.price) * this.data.sale.number;
    wx.redirectTo({
      url: "/pages/sale/sale"
    })
  },
  confirm: function () {
    this.creatsale(1);
    app.data.salelist[app.data.workerid + 1].push(this.data.sale)
    app.data.salelist[app.data.workerid][app.data.salelist[app.data.workerid].length - 1].profit= (this.data.sale.price - app.data.goodselected.price) * this.data.sale.number;
    wx.redirectTo({
      url: "/pages/sale/sale"
    })
  },
  creatsale: function (state) {
    var i = app.data.salelist[app.data.workerid].length;
    this.data.sale.number = this.data.number;
    this.data.sale.name = this.data.name;
    this.data.sale.id = i;
    this.data.sale.price = this.data.price;
    this.data.sale.profit = 0;
    this.data.sale.goodselected = this.data.goodselected;
    this.data.sale.houseselectedid = this.data.houseselectedid;
    this.data.sale.state = state;//0保存，1提交且未审核，2已审核未通过，3已审核通过
    app.data.salelist[app.data.workerid].push(this.data.sale);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: app.data.goodselected.carid,
      goodselected: app.data.goodselected,
      houseselectedid: app.data.house_id
    })
    console.log(app.data.goodselected)
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