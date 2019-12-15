// pages/editsale/editsale.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    number: '',
    price:'',
    sale:{}
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
    this.edit();
    app.data.salelist[app.data.workerid][app.data.saleid].profit = (app.data.salelist[app.data.workerid][app.data.saleid].price - app.data.goodselected.price) * app.data.salelist[app.data.workerid][app.data.saleid].number;
    wx.redirectTo({
      url: "/pages/sale/sale"
    })
  },
  confirm: function () {
    this.edit();
    app.data.salelist[app.data.workerid][app.data.saleid].state = 1;
    app.data.salelist[app.data.workerid + 1].push(app.data.salelist[app.data.workerid][app.data.saleid])
    app.data.salelist[app.data.workerid][app.data.saleid].profit = (app.data.salelist[app.data.workerid][app.data.saleid].price - app.data.goodselected.price) * app.data.salelist[app.data.workerid][app.data.saleid].number;
    wx.redirectTo({
      url: "/pages/sale/sale"
    })
  },
  edit:function(){
    app.data.salelist[app.data.workerid][app.data.saleid].name = this.data.name;
    app.data.salelist[app.data.workerid][app.data.saleid].number = this.data.number;
    app.data.salelist[app.data.workerid][app.data.saleid].price = this.data.price;
    app.data.salelist[app.data.workerid][app.data.saleid].houseselectedid = app.data.house_id;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    if(app.data.addoredit == 0){
      this.setData({
        name: app.data.salelist[app.data.workerid][app.data.saleid].name,
      })
    }
    if (app.data.addoredit == 1) {
      this.setData({
        name: app.data.goodselected.carid,
      })
    }
    this.setData({
      number: app.data.salelist[app.data.workerid][app.data.saleid].number,
      price: app.data.salelist[app.data.workerid][app.data.saleid].price
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