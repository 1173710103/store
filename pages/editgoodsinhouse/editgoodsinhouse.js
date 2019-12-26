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
    console.log(app.data.houselist);
    app.data.houselist[app.data.houseid].number = app.data.houselist[app.data.houseid].number - parseInt(app.data.houselist[app.data.houseid].list[app.data.goodsinhouse_id].number) + parseInt(this.data.number);
    console.log(app.data.houselist[app.data.houseid].number,parseInt(app.data.houselist[app.data.houseid].list[app.data.goodsinhouse_id].number),parseInt(this.data.number));
    app.data.houselist[app.data.houseid].price = app.data.houselist[app.data.houseid].price - parseInt(app.data.houselist[app.data.houseid].list[app.data.goodsinhouse_id].number) * parseInt(app.data.houselist[app.data.houseid].list[app.data.goodsinhouse_id].price) + parseInt(this.data.number) * parseInt(this.data.price);
    app.data.houselist[app.data.houseid].list[app.data.goodsinhouse_id].price = this.data.price;
    app.data.houselist[app.data.houseid].list[app.data.goodsinhouse_id].carid = this.data.name;
    app.data.houselist[app.data.houseid].list[app.data.goodsinhouse_id].number = this.data.number; 
    wx.navigateBack({

    })

    wx.cloud.callFunction({
      // 云函数名称 
      name: 'deleteHouse',
      // 传给云函数的参数 
      success: function () {
        console.log("删除成功")

        const db = wx.cloud.database()
        for (var i = app.data.houselist.length - 1; i >= 0; i--) {
          wx.cloud.callFunction({
            name: 'addGoodintoHouse',
            data: {
              id: app.data.houselist[i].id,
              name: app.data.houselist[i].name,
              list: app.data.houselist[i].list,
              number: app.data.houselist[i].number,
              price: app.data.houselist[i].price,
              totalprice: app.data.houselist[i].totalprice,
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