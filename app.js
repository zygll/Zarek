const API = require('/utils/base')
App({

  onLaunch: function () {
    API.login();
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        this.globalData.CustomBar = e.platform == 'android' ? e.statusBarHeight + 50 : e.statusBarHeight + 45;
      }
    })

      wx.loadFontFace({
        family: 'Nabla', //设置一个font-family使用的名字 中文或英文
        global: true,//是否全局生效
        source: 'url("https://zygll.com/wp-content/uploads/Nabla.ttf")', //字体资源的地址
        success: function(e){
          console.log('Nabla-字体调用成功')
        },
        fail: function (e) {
          console.log('字体调用失败')
        },
      })
      wx.loadFontFace({
        family: 'JinBuTi', //设置一个font-family使用的名字 中文或英文
        global: true,//是否全局生效
        source: 'url("https://zygll.com/wp-content/uploads/JinBuTi.ttf")', //字体资源的地址
        success: function(e){
          console.log('JinBuTi-字体调用成功')
        },
        fail: function (e) {
          console.log('字体调用失败')
        },
      })
      wx.loadFontFace({
        family: 'SmileySans', //设置一个font-family使用的名字 中文或英文
        global: true,//是否全局生效
        source: 'url("https://zygll.com/wp-content/uploads/SmileySans.ttf")', //字体资源的地址
        success: function(e){
          console.log('SmileySans-字体调用成功')
        },
        fail: function (e) {
          console.log('字体调用失败')
        },
      })
  },

  onShow: function () {
    this.globalData.user = API.getUser();
  },

  globalData: {
    user: '',
    StatusBar: '',
    CustomBar: ''
  }

})