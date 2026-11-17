/**
 * app.js
 * 小程序全局逻辑与全局数据
 */
App({
  globalData: {
    appName: '金丽星服装定制',
    // 公司联系方式（关于我们 / 联系我们统一从这里读取，修改一次全局生效）
    contact: {
      company: '深圳市金丽星服装有限公司',
      phone: '0755-8888 8888',
      mobile: '138 0000 0000',
      address: '广东省深圳市龙岗区（示例地址，请替换为真实地址）',
      wechat: 'jinlixing-fz',
      email: 'sales@example.com'
    }
  },

  onLaunch: function () {
    // 小程序启动时可在此处做初始化（当前演示版无需额外操作）
    console.log('[金丽星] 小程序启动');
  }
});
