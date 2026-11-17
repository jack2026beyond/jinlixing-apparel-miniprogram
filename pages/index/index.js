/**
 * pages/index/index.js
 * 首页逻辑：加载横幅、分类、热门商品数据，处理各类点击跳转
 */
const data = require('../../utils/data.js');

Page({
  data: {
    banners: [
      { id: 1, image: data.IMG + 'banner-1.png', url: '/pages/products/products?key=workwear' },
      { id: 2, image: data.IMG + 'banner-2.png', url: '/pages/products/products?key=jacket' },
      { id: 3, image: data.IMG + 'banner-3.png', url: '/pages/inquiry/inquiry' }
    ],
    highlights: [
      { icon: '✓', text: '厂家直供' },
      { icon: '✓', text: '免费设计' },
      { icon: '✓', text: '快速打样' },
      { icon: '✓', text: '全国发货' }
    ],
    categories: [],
    hotProducts: [],
    flows: [
      { step: '1', title: '咨询沟通', desc: '告知款式与需求' },
      { step: '2', title: '设计方案', desc: '免费排版设计' },
      { step: '3', title: '确认打样', desc: '实物样衣确认' },
      { step: '4', title: '批量生产', desc: '按期交付' }
    ]
  },

  onLoad: function () {
    // 从本地数据模型读取分类与热门商品
    this.setData({
      categories: data.categories,
      hotProducts: data.products.filter(function (p) { return p.hot; })
    });
  },

  // 点击横幅
  onBannerTap: function (e) {
    const url = e.currentTarget.dataset.url;
    if (url) wx.navigateTo({ url: url });
  },

  // 点击分类：跳转到产品列表并带上分类 key
  onCategoryTap: function (e) {
    const key = e.currentTarget.dataset.key;
    wx.navigateTo({ url: '/pages/products/products?key=' + key });
  },

  // 点击热门商品：跳转到商品详情
  onProductTap: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id });
  },

  // 查看全部商品
  goProducts: function () {
    wx.switchTab({ url: '/pages/products/products' });
  },

  // 联系我们 -> 关于我们页面（含联系方式）
  goAbout: function () {
    wx.switchTab({ url: '/pages/about/about' });
  },

  // 分享小程序
  onShareAppMessage: function () {
    return {
      title: '深圳市金丽星服装有限公司 - 专业工装团体定制',
      path: '/pages/index/index'
    };
  }
});
