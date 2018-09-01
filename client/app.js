//app.js test
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var tunnelUtils = require('./utils/tunnelUtil.js')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)

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

        //连接信道
      // tunnelUtils.switchTunnel();
  },
  globalData: {
    userInfo: null,

    category:[
      {
        id: "guowei",
        banner: "../../../image/b2.jpg",
        name: "果味",
      },
      {
        id: "shucai",
        banner: "../../../image/b2.jpg",
        name: "蔬菜",
      },
      {
        id: "chaohuo",
        banner: "../../../image/b2.jpg",
        name: "炒货",
      },
      {
        id: "dianxin",
        banner: "../../../image/b2.jpg",
        name: "点心",
      },
    ],

    goods: [{
      id: 0,
      image: '/image/goods1.png',
      title: '新鲜梨花带雨',
      price: 0.01,
      stock: '有货',
      detail: '这里是梨花带雨详情。',
      parameter: '125g/个',
      service: '不支持退货',
      category: "guowei",
      theme: 1,
      isnew: true
    },
    {
      id: 1,
      image: '/image/s4.png',
      title: '瓜子 100g',
      price: 0.02,
      stock: '有货',
      detail: '这里是瓜子详情。',
      parameter: '125g/个',
      service: '不支持退货',
      category: "shucai",
      theme: 2,
      isnew: true
    },
    {
      id: 2,
      image: '/image/s5.png',
      title: '芹菜 半斤',
      price: 0.03,
      stock: '有货',
      detail: '这里是芹菜详情。',
      parameter: '125g/个',
      service: '不支持退货',
      category: "chaohuo",
      theme: 3,
      isnew: true
    },
    {
      id: 3,
      image: '/image/s6.png',
      title: '粟米 一斤',
      price: 0.04,
      stock: '有货',
      detail: '这里是粟米详情。',
      parameter: '125g/个',
      service: '不支持退货',
      category: "dianxin",
      theme: 1,
      isnew: true
      },
      {
        id: 4,
        image: '/image/s6.png',
        title: '粟米2 一斤',
        price: 0.04,
        stock: '有货',
        detail: '这里是粟米详情。',
        parameter: '125g/个',
        service: '不支持退货',
        category: "dianxin",
        theme: 2,
        isnew: true
      },
      {
        id: 5,
        image: '/image/s6.png',
        title: '粟米3 一斤',
        price: 0.04,
        stock: '有货',
        detail: '这里是粟米详情。',
        parameter: '125g/个',
        service: '不支持退货',
        category: "dianxin",
        theme: 3,
        isnew: false
      },
      {
        id: 6,
        image: '/image/s6.png',
        title: '粟米4 一斤',
        price: 0.04,
        stock: '有货',
        detail: '这里是粟米详情。',
        parameter: '125g/个',
        service: '不支持退货',
        category: "dianxin",
        theme: 1,
        isnew: false
      }]
    }
})