//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 搜索内容
    search_val: "",
    // banner图 指示点
    indicatorDots: true,
    // banner图 是否自动播放
    autoplay: true,
    // banner图 自动切换时间间隔
    interval: 2000,
    // banner图 滑动动画时长
    duration: 500,
    // banner图 图片
    bannerList: [
      "swiper1",
      "swiper2",
      "swiper3",
      "swiper4"
    ],
    // 是否显示下拉提示
    isPullDownShow: false,
    // 下拉刷新提示文字
    pullDownText: true,
    // 商品列表页数
    page: 1,
    // 商品列表每页条数
    pageSize: 15
  },
  onLoad () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // 页面加载时获取banner图列表
    this.getBannerList()
    // 页面加载时获取商品列表
    this.getGoodsList()
  },
    // 获取用户信息
    getUserInfo (e) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },
  // 下拉刷新
  onPullDownRefresh () {
    wx.showLoading({
      title: '内容刷新中...',
      mask: true
    })
    this.setData({
      page: 1,
    })
    this.getGoodsList()
  },
  // 上拉触底加载
  onReachBottom () {
    this.setData({
      page: this.data.page++
    })
    this.getGoodsList()
  },
  // 获取搜索内容
  getSearchVal (e) {
    this.setData({
      search_val: e.detail.value
    });
  },
  // 发送搜索信息
  sendSearchData () {
    console.log(this.data.search_val)
  },
  // 获取banner图列表
  getBannerList () {
    wx.request({
      url: app.globalData.HOST + '',
      method:"post",
      data: {
      },
      success: function (e) {
        console.log(e)
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 2000
        })
        setTimeout(function () { wx.hideToast()},5000)
      }
    })
  },
  // 获取商品列表
  getGoodsList () {
    console.log(this.data.page)
    wx.request({
      url: app.globalData.HOST + '',
      method:"post",
      data: {
        page: this.data.page,
        pageSize: this.data.pageSize
      },
      success: function (e) {
        console.log(e)
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 2000
        })
        setTimeout(function () { wx.hideToast()},5000)
      }
    })
  }
})
