// pages/addsale/addsale.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    username:'',
    number: '',
    price:'',
    sale: {},
    houseselectedid:0,
    goodselected:{},
    user:{}
  },

  input_name: function () {
    wx.hideKeyboard()
    wx.redirectTo({
      url: "/pages/houseslistforselecting/houseslistforselecting",
    })
  },

  input_user: function () {
    wx.hideKeyboard()
    wx.redirectTo({
      url: "/pages/userslistforselecting/userslistforselecting",
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
    const db = wx.cloud.database()

    wx.cloud.callFunction({
      // 云函数名称 
      name: 'deleteSale',
      // 传给云函数的参数 
      success: function () {
        console.log("删除成功")
        wx.cloud.callFunction({
          name: 'addSale',
          data: {
            list: app.data.salelist,
            flag: true
          },
          complete: res => {
            console.log("添加成功")
          }
        })
      },
      fail: console.error
    }) 

    // wx.cloud.callFunction({
    //   // 云函数名称 
    //   name: 'deleteSale',
    //   // 传给云函数的参数 
    //   success: function () {
    //     console.log("删除成功")
    //     const db = wx.cloud.database()
    //     db.collection('sale_list').add({
    //       data: {
    //         list: app.data.salelist[app.data.workerid],
    //         listnumber: app.data.workerid,
    //         flag: true
    //       },
    //       success: res => {
    //         console.log("插入成功");
    //       }
    //     }) 
    //   },
    //   fail: console.error
    // }) 
  },
  confirm: function () {
    this.creatsale(1);
    app.data.salelist[app.data.workerid + 1].push(this.data.sale)
    app.data.salelist[app.data.workerid][app.data.salelist[app.data.workerid].length - 1].profit= (this.data.sale.price - app.data.goodselected.price) * this.data.sale.number;
    if (this.data.sale.number == 1){
      app.data.list_users[parseInt(this.data.sale.user.id.substring(3, this.data.sale.user.id.length))].usertype = "零售客户";
    }
    if (this.data.sale.number > 1) {
      app.data.list_users[parseInt(this.data.sale.user.id.substring(3, this.data.sale.user.id.length))].usertype = "批发客户";
    }
    console.log(app.data.list_users[parseInt(this.data.sale.user.id.substring(3, this.data.sale.user.id.length))])
    wx.redirectTo({
      url: "/pages/sale/sale"
    })

    wx.cloud.callFunction({
      // 云函数名称 
      name: 'deleteSale',
      // 传给云函数的参数 
      success: function () {
        console.log("删除成功")
        const db = wx.cloud.database()
        wx.cloud.callFunction({
          name: 'addSale',
          data: {
            list: app.data.salelist,
            flag: true
          },
          complete: res => {
            console.log("添加成功")
          }
        })
      },
      fail: console.error
    }) 

  },
  creatsale: function (state) {
    var i = app.data.salelist[app.data.workerid].length;
    this.data.sale.number = this.data.number;
    this.data.sale.name = this.data.name;
    this.data.sale.user = this.data.user;
    this.data.sale.username = this.data.username;
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
      username: app.data.userselected.carid,
      user: app.data.userselected,
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