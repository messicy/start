var qcloud = require('../vendor/wafer2-client-sdk/index')
var config = require('../config')
var util = require('./util.js')

var switchTunnel = () => {
    openTunnel()
}

var tunnel

var openTunnel = () => {
  util.showBusy('数据更新中...')
  // 创建信道，需要给定后台服务地址
  tunnel = new qcloud.Tunnel(config.service.tunnelUrl)

  // 监听信道内置消息，包括 connect/close/reconnecting/reconnect/error
  tunnel.on('connect', () => {
    // util.showSuccess('信道已连接')
    console.log('WebSocket 信道已连接')
  })

  tunnel.on('close', () => {
    util.showSuccess('网络已断开')
    console.log('WebSocket 信道已断开')
  })

  tunnel.on('reconnecting', () => {
    console.log('WebSocket 信道正在重连...')
    util.showBusy('正在重连')
  })

  tunnel.on('reconnect', () => {
    console.log('WebSocket 信道重连成功')
    util.showSuccess('重连成功')
  })

  tunnel.on('error', error => {
    util.showModel('信道发生错误', error)
    console.error('信道发生错误：', error)
  })

  // 监听自定义消息（服务器进行推送）
  tunnel.on('speak', speak => {
    showPush('拼单消息', speak["who"] + speak["word"], speak["good"])
    console.log('收到说话消息：', speak)
  })

  // 打开信道
  tunnel.open()

}

/**
 * 使用信道发送消息
 */
var sendMessage = (goodId) => {
  // 使用 tunnel.isActive() 来检测当前信道是否处于可用状态
  if (tunnel && tunnel.isActive()) {
    // 使用信道给服务器推送「speak」消息
    tunnel.emit('speak', {
      'word': '发起了拼单',
      'good': goodId
    });
  }
}

//显示分发消息
var showPush = (title, content, goodId) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false,
    confirmText: "加入",
    complete() {
      wx.navigateTo({
        url: '../orders/orders?id='+goodId
      })
    }
  })
}

/**
 * 关闭已经打开的信道
 */
var closeTunnel = tunel => {
  if (tunnel) {
    tunnel.close();
  }
  util.showBusy('信道连接中...')
}

module.exports = { switchTunnel, openTunnel, sendMessage }


