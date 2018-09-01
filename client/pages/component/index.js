var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    imgUrls: [
      '/image/c1.png',
      '/image/s3.png',
      '/image/list1.png'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
    goods: null
  },

  onLoad: function (options) {
    var newgoods = getApp().globalData.goods.filter(function (good) {
      return good.isnew;
    });

    this.setData({
      goods: newgoods
    })
  },

})