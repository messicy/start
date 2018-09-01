// page/component/new-pages/user/address/address.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')

Page({
  data:{
    address:{
      name:'',
      phone:'',
      detail:''
    }
  },
  onLoad(){
    var self = this;
    
    wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          address : res.data
        })
      }
    })

    qcloud.request({
      url: `${config.service.host}/weapp/address/load`,
      login: false,
      success(result) {
        console.log('response data', JSON.stringify(result.data));
        if (result.data["data"]["msg"] != "undefined")
        {
          self.setData({
            address: result.data["data"]["msg"][0]
          })
        }
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },
  formSubmit(e){
    const value = e.detail.value;
    if (value.name && value.phone && value.detail){
      wx.setStorage({
        key: 'address',
        data: value,
        success(){
          wx.navigateBack();
        }
      })

      qcloud.request({
        url: `${config.service.host}/weapp/address/update?name=${value.name}&phone=${value.phone}&detail=${value.detail}`,
        login: false,
        success(result) {
          console.log('response data', JSON.stringify(result.data));
        },
        fail(error) {
          util.showModel('请求失败', error);
          console.log('request fail', error);
        }
      })

    }else{
      wx.showModal({
        title:'提示',
        content:'请填写完整资料',
        showCancel:false
      })
    }
  }
})