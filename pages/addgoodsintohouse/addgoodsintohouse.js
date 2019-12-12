// pages/addgoodsintohouse/addgoodsintohouse.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    price: '',
    number:'',
    state: -1,
    nowprice: '',
    nowname: ''
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
    var flag = 0;
    for (var i = 0; i < app.data.list_house.length; i++){
      if (app.data.list_house[i].carid == this.data.name && app.data.list_house[i].price == this.data.price){
        app.data.list_house[i].number = parseInt(app.data.list_house[i].number) + parseInt(this.data.number);
        flag = 1;
      }
    }
    if(flag == 0){
      var i = app.data.list_house.length;
      var goodsinhouse = {};
      goodsinhouse.price = this.data.price;
      goodsinhouse.carid = this.data.name;
      goodsinhouse.number = this.data.number;
      goodsinhouse.msgText = '序号000' + i;
      goodsinhouse.id = "id-" + i;
      goodsinhouse.headerImg = '../../images/tab/a1.png';
      goodsinhouse.siteImg = '../../img/site.png';
      app.data.list_house.push(goodsinhouse);
    }
    wx.navigateBack({

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      state: app.data.state
    })
    console.log(this.data.state);
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