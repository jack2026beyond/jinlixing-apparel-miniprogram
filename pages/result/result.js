/**
 * pages/result/result.js 询价提交结果页
 */
Page({
  data: {
    id: '',
    phone: ''
  },

  onLoad: function (options) {
    this.setData({
      id: options.id || '',
      phone: options.phone || ''
    });
  },

  goHome: function () {
    wx.switchTab({ url: '/pages/index/index' });
  },

  goInquiry: function () {
    wx.redirectTo({ url: '/pages/inquiry/inquiry' });
  }
});
