// pages/userslistforselecting/userslistforselecting.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: app.data.list_users,
    height: 0,
    scrollY: true
  },
  lastShowMsgId: '', //记录上次显示菜单的消息id
  swipeDirection: 0, //是否触发水平滑动 0:未触发 1:触发水平滑动 2:触发垂直滑动

  add: function () {
    wx.navigateTo({
      url: '/pages/addusers/addusers',
    })
  },

  click: function (e) {
    console.log(parseInt(e.target.id.substring(3, e.target.id.length)));
    app.data.userselected = this.data.msgList[parseInt(e.target.id.substring(3, e.target.id.length))];
    if (app.data.addoredit == 0) {
      wx.redirectTo({
        url: "/pages/addsale/addsale"
      })
    }
    else {
      wx.redirectTo({
        url: "/pages/editsale/editsale"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  ontouchstart: function (e) {
    this.firstTouchY = e.touches[0].clientY;
    this.lastMoveTime = e.timeStamp;
  },
  ontouchmove: function (e) {
    if (this.swipeCheckState === 0) {
      return;
    }
    //当开始触摸时有菜单显示时，不处理滑动操作
    var moveY = e.touches[0].clientY - this.firstTouchY;
    //已触发垂直滑动，由scroll-view处理滑动操作
    if (this.swipeDirection === 2) {
      return;
    }
    //未触发滑动方向
    if (this.swipeDirection === 0) {
      console.log(Math.abs(moveY));
      //触发垂直操作
      if (Math.abs(moveY) > 4) {
        this.swipeDirection = 2;

        return;
      }
      else {
        return;
      }

    }
    this.lastMoveTime = e.timeStamp;
  },
  ontouchend: function (e) {
    this.swipeCheckState = 0;
    var swipeDirection = this.swipeDirection;
    this.swipeDirection = 0;
    //垂直滚动，忽略
    if (swipeDirection !== 1) {
      return;
    }
    //不显示菜单,激活垂直滚动
    this.setData({ scrollY: true });
    //this.translateXMsgItem(e.currentTarget.id, 0, 0);
  },
  getItemIndex: function (id) {
    var msgList = this.data.msgList;
    for (var i = 0; i < msgList.length; i++) {
      if (msgList[i].id === id) {
        return i;
      }
    }
    return -1;
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
    this.pixelRatio = app.data.deviceInfo.pixelRatio;
    var windowHeight = app.data.deviceInfo.windowHeight;
    var height = windowHeight;
    this.setData({ msgList: app.data.list_users, height: height });
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