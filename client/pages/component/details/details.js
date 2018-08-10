// page/component/details/details.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')
var tunnelUtil = require('../../../utils/tunnelUtil.js')

Page({
  data:{
    goods: {
      id: 1,
      image: '/image/goods1.png',
      title: '新鲜梨花带雨',
      price: 0.01,
      stock: '有货',
      detail: '这里是梨花带雨详情。',
      parameter: '125g/个',
      service: '不支持退货'
    },
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false
  },

  onLoad: function (options) {
    console.log("asdfawe " + options.id)
    var newgoods = getApp().globalData.goods[options.id]
    this.setData({
      goods: newgoods
    })
  },

  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num : num
    })
  },

  addToCart() {
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;

    self.setData({
      show: true
    })
    setTimeout( function() {
      self.setData({
        show: false,
        scaleCart : true
      })
      setTimeout( function() {
        self.setData({
          scaleCart: false,
          hasCarts : true,
          totalNum: num + total
        })
      }, 200)
    }, 300)

  },

  faqiPindan() {
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;

    tunnelUtil.sendMessage()    
    // util.showBusy('请求中...')
    // var that = this
    // qcloud.request({
    //   url: `${config.service.host}/weapp/pintuan`,
    //   login: false,
    //   success(result) {
    //     util.showSuccess('请求成功完成')
    //     that.setData({
    //       requestResult: JSON.stringify(result.data)
    //     })
    //     console.log('response data', JSON.stringify(result.data));
        
    //   },
    //   fail(error) {
    //     util.showModel('请求失败', error);
    //     console.log('request fail', error);
    //   }
    // })
  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }
 
})