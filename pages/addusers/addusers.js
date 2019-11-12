// pages/addusers/addusers.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    age: ''
  },

  input_name: function (in_name) {
    this.setData({
      name: in_name.detail.value
    })
  },

  input_age: function (in_age) {
    this.setData({
      age: in_age.detail.value
    })
  },

  confirm: function () {
    var i = app.data.list_users.length;
    var msg_users = {};
    msg_users.age = this.data.age;
    msg_users.carid = this.data.name;
    msg_users.msgText = '序号000' + i;
    msg_users.id = i;
    msg_users.headerImg = '../../images/tab/b.png';
    msg_users.siteImg = '../../img/site.png';
    app.data.list_users.push(msg_users);
    wx.navigateBack({

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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