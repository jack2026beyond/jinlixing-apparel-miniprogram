/**
 * pages/about/about.js
 * 关于我们页：公司简介、工厂实拍、联系方式（拨打电话/复制信息）
 */
const app = getApp();
const IMG = require('../../utils/data.js').IMG;

Page({
  data: {
    contact: {},
    intro: {
      p1: '深圳市金丽星服装有限公司是一家专注于工装与团体服装定制的企业，主营工装、冲锋衣、衬衫、马甲及各类团体定制服装。',
      p2: '公司拥有现代化生产车间与成熟的供应链体系，从面料采购、版型设计、裁剪缝制到成衣质检，严控每一道工序，致力于为客户打造品质可靠、穿着得体的团队服装。',
      p3: '我们提供来图来样定制、免费设计排版与快速打样服务，广泛服务于工厂企业、工程建筑、物业后勤、门店零售等各类客户。'
    },
    stats: [
      { value: '10+', label: '年行业经验' },
      { value: '1000+', label: '服务企业' },
      { value: '30万+', label: '年产能(件)' },
      { value: '98%', label: '客户好评' }
    ],
    business: ['工装定制', '冲锋衣定制', '商务衬衫', '工装马甲', '团体定制', '来图打样'],
    factories: [
      { image: IMG + 'factory-1.png', caption: '现代化生产车间' },
      { image: IMG + 'factory-2.png', caption: '精准裁剪工艺' },
      { image: IMG + 'factory-3.png', caption: '严格成衣质检' }
    ]
  },

  onLoad: function () {
    // 联系方式从全局配置读取，方便统一修改
    this.setData({ contact: app.globalData.contact });
  },

  // 拨打电话
  callPhone: function (e) {
    const phone = (e.currentTarget.dataset.phone || '').replace(/\s/g, '');
    if (phone) {
      wx.makePhoneCall({ phoneNumber: phone });
    }
  },

  // 复制文本（微信/邮箱/地址）
  copyText: function (e) {
    const text = e.currentTarget.dataset.text;
    wx.setClipboardData({
      data: text,
      success: function () {
        wx.showToast({ title: '已复制', icon: 'success' });
      }
    });
  },

  // 预览工厂图片
  previewFactory: function (e) {
    const index = e.currentTarget.dataset.index;
    const urls = this.data.factories.map(function (f) { return f.image; });
    wx.previewImage({ current: urls[index], urls: urls });
  },

  goInquiry: function () {
    wx.switchTab({ url: '/pages/inquiry/inquiry' });
  }
});
