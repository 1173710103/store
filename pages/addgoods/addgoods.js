// pages/addgoods/addgoods.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    price:'',
    state: -1,
  },

  input_name:function(in_name){
    this.setData({
      name: in_name.detail.value
    })
  },

  input_price:function (in_price) {
    this.setData({
      price: in_price.detail.value
    })
  },

  confirm: function () {
    var i = app.data.list_goods.length;
    var msg_goods = {};
    msg_goods.price = this.data.price;
    msg_goods.carid = this.data.name;
    msg_goods.msgText = '序号000' + i;
    msg_goods.id = "id-"+i;
    msg_goods.headerImg = '../../images/tab/a1.png';
    msg_goods.siteImg = '../../img/site.png';
    app.data.list_goods.push(msg_goods);
    wx.navigateBack({

    })

    wx.cloud.callFunction({
      name: 'addGoods',
      data: {
        id: msg_goods.id,
        price: msg_goods.price,
        carid: msg_goods.carid,
        msgText: msg_goods.msgText,
        headerImg: msg_goods.headerImg,
        siteImg: msg_goods.siteImg,
        flag: true
      },
      complete: res => {
        console.log("添加成功")
      }
    })

    //wx.cloud.init(); 
    // const db = wx.cloud.database()
    // db.collection('goods').add({
    //   data: {
    //     id: msg_goods.id,
    //     price: msg_goods.price,
    //     carid: msg_goods.carid,
    //     msgText: msg_goods.msgText,
    //     headerImg: msg_goods.headerImg,
    //     siteImg: msg_goods.siteImg,
    //     flag: true
    //   },
    //   success: res => {
    //     console.log("插入成功");
    //   }
    // }) 
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