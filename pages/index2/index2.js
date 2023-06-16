import * as echarts from '../../ec-canvas/echarts';
let chart = null;
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: 'Zreak',
            fontSize: 30,
            fontWeight: 'bold',
            lineDash: [0, 100],
            lineDashOffset: 0,
            fill: 'transparent',
            stroke: '#9ff7ba',
            lineWidth: 1
          },
          keyframeAnimation: {
            duration:10000,
            loop: true,
            keyframes: [
              {
                percent: 0.7,
                style: {
                  fill: '#ffc250',
                  lineDashOffset: 200,
                  lineDash: [300, 0]
                }
              },
              {
                // Stop for a while.
                percent: 0.8,
                style: {
                  fill: '#3ff7f9'
                }
              },
              {
                percent: 1,
                style: {
                  fill: '#5200b9'
                }
              }
            ]
          }
        }
      ]
    }
  };

  chart.setOption(option);
  return chart;
}
//以上logo部分
const API = require('../../utils/api')
var timer = null;
Page({
  data: {
    ec: {
      onInit: initChart // 渲染logo
    },
    posts: [],
    text: "",
    typing: "",
    description: "长到这么大，我说不出来我最爱的一部电影",
    interval: 20,
    page: 1,
    siteInfo: '',
    indicatorDots: !1,
    autoplay: !0,
    interval: 3e3,
    currentSwiper: 0,
    navBarHeight: wx.getSystemInfoSync().statusBarHeight,
    placeHolder: '搜索你感兴趣的内容...',
    autoFocus: false,
    inputEnable: true,
    isLastPage: false
  },

  onLoad: function () {
    console.log('onLoad');
    let that = this;
    // var index = 0;
    // var temp = "";
    // timer = setInterval(function () {
    //   if (temp.length < init_text.length) {
    //     temp += init_text[index]
    //     index = (index + 1);

    //   }else{
    //   console.log('timer');
    //   }
    //   that.setData({
    //     text: temp
    //   });
    // }, that.data.interval);


    wx.getSystemInfo({
      success: function (a) {
        that.setData({
          isIphoneX: a.model.match(/iPhone X/gi)
        });
      }
    });
    this.getCategories({
      per_page: 2
    });
    // this.getAdvert();
    this.getPostList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getSiteInfo();
    // this.getStickyPosts();


    console.log('onShow');

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide');
    clearInterval(timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload');
  },

  onClear: function () {
    this.setData({
      searchKey: '',
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      page: 1,
      posts: [],
      isLastPage: false
    })
    this.getPostList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.isLastPage) {
      this.getPostList({
        page: this.data.page
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.siteInfo.name,
      path: '/pages/index/index'
    }
  },

  getSiteInfo: function () {
    API.getSiteInfo().then(res => {
        this.setData({
          siteInfo: res,
          description: res.description
        })
        this.animate(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  animate(res) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'linear'
    })
    that.animation = animation;
    animation.opacity(1).step();
    that.setData({
      animationData: animation.export()
    })
    var i = 0;
    timer = setInterval(function () {
      if (i <= res.description.length) {
        that.setData({
          typing: res.description.slice(0, i++)
        })
      }
    }, 200)
  },
  onInput: function (e) {
    this.setData({
      searchKey: e.detail.value
    })
  },

  currentChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    });
  },

  getStickyPosts: function () {
    API.getStickyPosts().then(res => {
        this.setData({
          stickyPost: res
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  getCategories: function (args) {
    API.getCategories(args).then(res => {
        this.setData({
          category: res
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  getPostList: function (data) {
    API.getPostsList(data).then(res => {
        let args = {}
        if (res.length < 10) {
          this.setData({
            isLastPage: true,
            loadtext: '到底啦',
            showloadmore: false
          })
        }
        if (this.data.isBottom) {
          args.posts = [].concat(this.data.posts, res)
          args.page = this.data.page + 1
        } else {
          args.posts = [].concat(this.data.posts, res)
          args.page = this.data.page + 1
        }
        this.setData(args)
        wx.stopPullDownRefresh()
      })
      .catch(err => {
        console.log(err)
        wx.stopPullDownRefresh()
      })
  },

  getAdvert: function () {
    API.indexAdsense().then(res => {
        console.log(res)
        if (res.status === 200) {
          this.setData({
            advert: res.data
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },

  bindCateByID: function (e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/list/list?id=' + id,
    })
  },

  bindCateList: function () {
    wx.switchTab({
      url: '/pages/category/category',
    })
  },

  bindDetail: function (e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },

  onConfirm: function (e) {
    let s = e.detail.value;
    wx.navigateTo({
      url: '/pages/list/list?s=' + s,
    })
  }

})