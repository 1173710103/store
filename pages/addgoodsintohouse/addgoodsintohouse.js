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

  addintohouse:function(houseid){
    var flag = 0;
    for (var i = 0; i < app.data.houselist[houseid].list.length; i++) {
      if (app.data.houselist[houseid].list[i].carid == this.data.name && app.data.houselist[houseid].list[i].price == this.data.price) {
        app.data.houselist[houseid].list[i].number = parseInt(app.data.houselist[houseid].list[i].number) + parseInt(this.data.number);
        flag = 1;
      }
    }
    if (flag == 0) {
      var i = app.data.houselist[houseid].list.length;
      var goodsinhouse = {};
      goodsinhouse.price = this.data.price;
      goodsinhouse.carid = this.data.name;
      goodsinhouse.number = this.data.number;
      goodsinhouse.msgText = '序号000' + i;
      goodsinhouse.id = "id-" + i;
      goodsinhouse.totalprice = parseInt(this.data.price) * parseInt(this.data.number);
      goodsinhouse.headerImg = '../../images/tab/a1.png';
      goodsinhouse.siteImg = '../../img/site.png';
      app.data.houselist[houseid].list.push(goodsinhouse);
    }
    console.log(app.data.houselist[houseid]);
    app.data.houselist[houseid].number = parseInt(this.data.number) + app.data.houselist[houseid].number;
    app.data.houselist[houseid].price = parseInt(this.data.number)* parseInt(this.data.price)+ app.data.houselist[houseid].price;
    wx.navigateBack({

    })
  },

  confirm: function () {
    console.log(app.data.houseid)
    this.addintohouse(app.data.houseid)

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