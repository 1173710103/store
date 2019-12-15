//app.js
App({
  data: {
    state: -1,
    deviceInfo: {},
    list_goods:[],
    list_users:[],
    goodname:'',
    username:'',
    house_id:0,//命名原则正好和good和user相反
    good_id:'',
    user_id:'',
    goodsinhouse_id: '',
    list_house: {name:"大仓库",id:0,list:[]},
    list_house1: { name: "门店仓库", id:1,list:[] },
    list_worker_0:[],
    list_worker_1: [],
    list_worker_2: [],
    houseid : 0,
    workerid:0,
    saleid:-1,
    houselist: [],
    salelist:[]
  },
  onLaunch: function () {
    this.data.houselist.push(this.data.list_house);
    this.data.houselist.push(this.data.list_house1);
    this.data.salelist.push(this.data.list_worker_0);
    this.data.salelist.push(this.data.list_worker_1);
    this.data.salelist.push(this.data.list_worker_2);
    this.data.deviceInfo = wx.getSystemInfoSync();
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})