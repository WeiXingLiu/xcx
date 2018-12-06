//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello Worgld',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.switchTab({
      url: '../logs/logs'
    })
  },
  navigationToMap: function() {
    wx.switchTab({
      url: '../map/map',
    })
    
  },
  scanCode: function () {
    wx.switchTab({
      url: '../scanCode/scanCode',
    })
  },
  swiper: function () {
    wx.navigateTo({
      url: '../swiper/swiper',
    })
  },
  navigation: function () {
    wx.navigateTo({
      url: '../navigation/navigation?options=2',
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          this.getUserInfo(res)
          // app.globalData.userInfo = res.userInfo
          // this.setData({
          //   userInfo: res.userInfo,
          //   hasUserInfo: true
          // })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.userInfo
    this.setData({
      userInfo: e.userInfo,
      hasUserInfo: true
    })
  }
})
