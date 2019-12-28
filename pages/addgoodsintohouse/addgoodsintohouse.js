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
    state: -1
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
      app.data.allgoods.push(goodsinhouse);
    }
    console.log(app.data.houselist);
    app.data.houselist[houseid].number = parseInt(this.data.number) + app.data.houselist[houseid].number;
    app.data.houselist[houseid].price = parseInt(this.data.number)* parseInt(this.data.price)+ app.data.houselist[houseid].price;

    // app.data.in_price = app.data.in_price + parseInt(this.data.price) * parseInt(this.data.number);
    // app.data.save_price = app.data.save_price + parseInt(this.data.price) * parseInt(this.data.number);

    wx.redirectTo({
      url: '/pages/house/house',
    })
  },

  confirm: function () {
    
    this.addintohouse(app.data.houseid)
    console.log(app.data.houselist)
    var list = app.data.houselist
    var goodlist = app.data.allgoods

    wx.cloud.callFunction({
      // 云函数名称 
      name: 'deleteAllGoods',
      // 传给云函数的参数 
      success: function () {
        console.log("删除成功")
        console.log(goodlist)

        const db = wx.cloud.database()
        for (var i = goodlist.length - 1; i >= 0; i--) {
          wx.cloud.callFunction({
            name: 'addAllGoods',
            data: {
              id: goodlist[i].id,
              name: goodlist[i].name,
              list: goodlist[i].list,
              number: goodlist[i].number,
              price: goodlist[i].price,
              totalprice: goodlist[i].totalprice,
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

    wx.cloud.callFunction({
      // 云函数名称 
      name: 'deleteHouse',
      // 传给云函数的参数 
      success: function () {
        console.log("删除成功")
        console.log(list)

        const db = wx.cloud.database()
        for (var i = list.length - 1; i >= 0; i--) {
          wx.cloud.callFunction({
            name: 'addGoodintoHouse',
            data: {
              id: list[i].id,
              name: list[i].name,
              list: list[i].list,
              number: list[i].number,
              price: list[i].price,
              totalprice: list[i].totalprice,
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