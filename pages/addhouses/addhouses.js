// pages/addhouses/addhouses.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
  },

  input_name: function (in_name) {
    this.setData({
      name: in_name.detail.value
    })
  },

  confirm: function () {
    var i = app.data.houselist.length;
    var msg_house = {};
    msg_house.name = this.data.name;
    msg_house.id = i;
    msg_house.list=[];
    app.data.houselist.push(msg_house);
    wx.navigateBack({

    })

    const db = wx.cloud.database()
    db.collection('house_list').add({
      data: {
        name: msg_house.name,
        id: msg_house.id,
        list: msg_house.list,
        flag: true
      },
      success: res => {
        console.log("插入成功");
      }
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