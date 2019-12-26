// pages/edithouses/edithouses.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
  },

  input_name: function (in_name) {
    this.setData({
      name: in_name.detail.value
    })
  },


  confirm: function () {
    app.data.houselist[app.data.houseid].name = this.data.name;
    wx.navigateBack({

    })

    wx.cloud.callFunction({
      // 云函数名称 
      name: 'deleteHouse',
      // 传给云函数的参数 
      success: function () {
        console.log("删除成功")

        for (var i = app.data.houselist.length - 1; i >= 0; i--) {
          wx.cloud.callFunction({
            name: 'addHouse',
            data: {
              id: msg_house.id,
              name: msg_house.name,
              list: msg_house.list,
              number: msg_house.number,
              price: msg_house.price,
              totalprice: msg_house.totalprice,
              flag: true
            },
            complete: res => {
              console.log("添加成功")
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
      name: app.data.houselist[app.data.houseid].name,
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
    this.setData({
      name: app.data.houselist[app.data.houseid].name,
    })
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