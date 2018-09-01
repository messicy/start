// page/component/new-pages/cart/cart.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')

Page({
  data: {
    carts:[],               // 购物车列表
    hasList:false,          // 列表是否有数据
    totalPrice:0,           // 总价，初始为0
    selectAllStatus:true,    // 全选状态，默认全选
    obj:{
        name:"hello"
    }
  },

  onShow() {
    var that = this;
    qcloud.request({
      url: `${config.service.host}/weapp/cart/load`,
      login: false,
      success(result) {
        console.log('response data', JSON.stringify(result.data));
        var goods = result.data["data"]["msg"];
        var cartGoods = [];
        for(var i = 0; i < goods.length; i++)
        {
          var goodId = goods[i]["id"];
          var good = getApp().globalData.goods[goodId];

          cartGoods.push(
            {
              id:goodId,
              title:good.title,
              image:good.image,
              num: goods[i]["num"],
              price:good.price,
              selected: true
            }
          );
        }

        that.setData({
          hasList: true,
          carts:cartGoods
        });
        that.getTotalPrice();
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    console.log("fwefwe " + index);

    let carts = this.data.carts;
    
    console.log("fwefwe22 " + carts[index].id);
    
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    var goodId = carts[index].id;
    carts.splice(index,1);
    this.setData({
      carts: carts
    });
    if(!carts.length){
      this.setData({
        hasList: false
      });
    }else{
      this.getTotalPrice();
    }

    qcloud.request({
      url: `${config.service.host}/weapp/cart/del?id=${goodId}`,
      login: false,
      success(result) {
        console.log('response data', JSON.stringify(result.data));
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    var goodId = carts[index].id;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();

    qcloud.request({
      url: `${config.service.host}/weapp/cart/add?id=${goodId}&num=1`,
      login: false,
      success(result) {
        console.log('response data', JSON.stringify(result.data));
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    var goodId = carts[index].id;
    let num = carts[index].num;
    if(num <= 1){
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();

    qcloud.request({
      url: `${config.service.host}/weapp/cart/reduce?id=${goodId}`,
      login: false,
      success(result) {
        console.log('response data', JSON.stringify(result.data));
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for(let i = 0; i<carts.length; i++) {         // 循环列表得到每个数据
      if(carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].num * carts[i].price;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  }

})