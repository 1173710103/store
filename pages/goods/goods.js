// pages/goods/goods.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogback: "<-",
    msgList: app.data.list_goods,
    height: 0,
    scrollY: true
  },
  swipeCheckX: 35, //激活检测滑动的阈值
  swipeCheckState: 0, //0未激活 1激活
  maxMoveLeft: 185, //消息列表项最大左滑距离
  correctMoveLeft: 175, //显示菜单时的左滑距离
  thresholdMoveLeft: 75,//左滑阈值，超过则显示菜单
  lastShowMsgId: '', //记录上次显示菜单的消息id
  moveX: 0,  //记录平移距离
  showState: 0, //0 未显示菜单 1显示菜单
  touchStartState: 0, // 开始触摸时的状态 0 未显示菜单 1 显示菜单
  swipeDirection: 0, //是否触发水平滑动 0:未触发 1:触发水平滑动 2:触发垂直滑动
  add:function(){
    app.data.state = 0;
    wx.navigateTo({
      url: '/pages/addgoods/addgoods',
    })
  },
  back: function () {
    wx.redirectTo({
      url: "/pages/list/list",
    })
  },

  click: function (e) {
    app.data.good_id = e.target.id.substring(3, e.target.id.length);
    wx.navigateTo({
      url: '/pages/good/good',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection('goods').orderBy('id', 'asc').get({
      success: res => {
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值  
        //console.log(res.data)
        app.data.list_goods = res.data
      }
    }),
      db.collection('users').orderBy('id', 'asc').get({
        success: res => {
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值  
          //console.log(res.data)
          app.data.list_users = res.data
        }
      }),
      db.collection('house_list').orderBy('id', 'asc').get({
        success: res => {
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值  
          //console.log(res.data)
          app.data.houselist = res.data
        }
      }),
      // console.log("!!!")
      db.collection('sale_list').orderBy('id', 'asc').get({
        success: res => {
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值  
          //console.log(res.data.length)
          if (res.data.length != 0)
            app.data.salelist = res.data[0].list
        }
      }),
      db.collection('allgoods').orderBy('id', 'asc').get({
        success: res => {
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值  
          //console.log(res.data)
          app.data.allgoods = res.data
        }
      });
  },

  ontouchstart: function (e) {
    if (this.showState === 1) {
      this.touchStartState = 1;
      this.showState = 0;
      this.moveX = 0;
      //console.log(this.lastShowMsgId)
      this.translateXMsgItem(this.lastShowMsgId, 0, 200);
      this.lastShowMsgId = "";
      return;
    }
    this.firstTouchX = e.touches[0].clientX;
    this.firstTouchY = e.touches[0].clientY;
    if (this.firstTouchX > this.swipeCheckX) {
      this.swipeCheckState = 1;
    }
    this.lastMoveTime = e.timeStamp;
  },
  ontouchmove: function (e) {
    if (this.swipeCheckState === 0) {
      return;
    }
    //当开始触摸时有菜单显示时，不处理滑动操作
    if (this.touchStartState === 1) {
      return;
    }
    var moveX = e.touches[0].clientX - this.firstTouchX;
    var moveY = e.touches[0].clientY - this.firstTouchY;
    //已触发垂直滑动，由scroll-view处理滑动操作
    if (this.swipeDirection === 2) {
      return;
    }
    //未触发滑动方向
    if (this.swipeDirection === 0) {
      //console.log(Math.abs(moveY));
      //触发垂直操作
      if (Math.abs(moveY) > 4) {
        this.swipeDirection = 2;

        return;
      }
      //触发水平操作
      if (Math.abs(moveX) > 4) {
        this.swipeDirection = 1;
        this.setData({ scrollY: false });
      }
      else {
        return;
      }

    }
    //禁用垂直滚动
    // if (this.data.scrollY) {
    //   this.setData({scrollY:false});
    // }

    this.lastMoveTime = e.timeStamp;
    //处理边界情况
    if (moveX > 0) {
      moveX = 0;
    }
    //检测最大左滑距离
    if (moveX < -this.maxMoveLeft) {
      moveX = -this.maxMoveLeft;
    }
    this.moveX = moveX;
    this.translateXMsgItem(e.currentTarget.id, moveX, 0);
  },
  ontouchend: function (e) {
    this.swipeCheckState = 0;
    var swipeDirection = this.swipeDirection;
    this.swipeDirection = 0;
    if (this.touchStartState === 1) {
      this.touchStartState = 0;
      this.setData({ scrollY: true });
      return;
    }
    //垂直滚动，忽略
    if (swipeDirection !== 1) {
      return;
    }
    if (this.moveX === 0) {
      this.showState = 0;
      //不显示菜单状态下,激活垂直滚动
      this.setData({ scrollY: true });
      return;
    }
    if (this.moveX === this.correctMoveLeft) {
      this.showState = 1;
      this.lastShowMsgId = e.currentTarget.id;
      return;
    }
    if (this.moveX < -this.thresholdMoveLeft) {
      this.moveX = -this.correctMoveLeft;
      this.showState = 1;
      this.lastShowMsgId = e.currentTarget.id;
    }
    else {
      this.moveX = 0;
      this.showState = 0;
      //不显示菜单,激活垂直滚动
      this.setData({ scrollY: true });
    }
    this.translateXMsgItem(e.currentTarget.id, this.moveX, 500);
    //this.translateXMsgItem(e.currentTarget.id, 0, 0);
  },
  onDeleteMsgTap: function (e) {
    var start = parseInt(e.target.id.substring(3, e.target.id.length));
    app.data.list_goods.splice(start,1);
    //console.log(start, app.data.list_goods.length);
    for (var i = start ; i < app.data.list_goods.length; i++) {
      app.data.list_goods[i].msgText = '序号000' + i;
      app.data.list_goods[i].id = "id-" + i;
      //console.log(app.data.list_goods[i]);
    }
    //console.log(app.data.list_goods);
    this.setData({
      msgList: app.data.list_goods
    })
    if (start != app.data.list_goods.length){
      this.ontouchstart(e);
    }

    wx.cloud.callFunction({
      // 云函数名称 
      name: 'deleteGoods',
      // 传给云函数的参数 
      success: function () {
        console.log("删除成功")

        const db = wx.cloud.database()
        for (var i = app.data.list_goods.length - 1; i >= 0; i--) {
          wx.cloud.callFunction({
            name: 'addGoods',
            data: {
              id: app.data.list_goods[i].id,
              price: app.data.list_goods[i].price,
              carid: app.data.list_goods[i].carid,
              msgText: app.data.list_goods[i].msgText,
              headerImg: app.data.list_goods[i].headerImg,
              siteImg: app.data.list_goods[i].siteImg,
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
  onDeleteMsgLongtap: function (e) {
    console.log(e);
  },
  onMarkMsgTap: function (e) {
    app.data.good_id = e.target.id.substring(3, e.target.id.length);
    app.data.state = 1;
    wx.navigateTo({
      url: '/pages/editgoods/editgoods',
    })
    this.ontouchstart(e);
  },
  onMarkMsgLongtap: function (e) {
    console.log(e);
  },
  getItemIndex: function (id) {
    var msgList = this.data.msgList;
    //console.log(msgList)
    for (var i = 0; i < msgList.length; i++) {
      if (msgList[i].id == id) {
        return i;
      }
    }
    return -1;
  },
  deleteMsgItem: function (e) {
    var animation = wx.createAnimation({ duration: 200 });
    animation.height(0).opacity(0).step();
    this.animationMsgWrapItem(e.currentTarget.id, animation);
    var s = this;
    setTimeout(function () {
      var index = s.getItemIndex(e.currentTarget.id);
      s.data.msgList.splice(index, 1);
      s.setData({ msgList: app.data.list_goods});
    }, 200);
    this.showState = 0;
    this.setData({ scrollY: true });
  },
  translateXMsgItem: function (id, x, duration) {
    var animation = wx.createAnimation({ duration: duration });
    animation.translateX(x).step();
    this.animationMsgItem(id, animation);
  },
  animationMsgItem: function (id, animation) {
    var index = this.getItemIndex(id);
    //console.log(index);
    var param = {};
    var indexString = 'msgList[' + index + '].animation';
    param[indexString] = animation.export();
    this.setData(param);
  },
  animationMsgWrapItem: function (id, animation) {
    var index = this.getItemIndex(id);
    var param = {};
    var indexString = 'msgList[' + index + '].wrapAnimation';
    param[indexString] = animation.export();
    this.setData(param);
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
    this.setData({msgList: app.data.list_goods, height: height });
    //console.log(this.data.msgList);

    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection('goods').orderBy('id', 'asc').get({
      success: res => {
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值  
        //console.log(res.data)
        app.data.list_goods = res.data
      }
    }),
      db.collection('users').orderBy('id', 'asc').get({
        success: res => {
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值  
          //console.log(res.data)
          app.data.list_users = res.data
        }
      }),
      db.collection('house_list').orderBy('id', 'asc').get({
        success: res => {
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值  
          //console.log(res.data)
          app.data.houselist = res.data
        }
      }),
      // console.log("!!!")
      db.collection('sale_list').orderBy('id', 'asc').get({
        success: res => {
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值  
          //console.log(res.data.length)
          if (res.data.length != 0)
            app.data.salelist = res.data[0].list
        }
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