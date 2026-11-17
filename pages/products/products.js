/**
 * pages/products/products.js
 * 产品列表页：支持按分类筛选，从商品详情页返回时可刷新
 */
const data = require('../../utils/data.js');

Page({
  data: {
    filters: [],       // 分类筛选项
    currentKey: 'all', // 当前选中的分类
    products: []       // 当前展示的商品
  },

  onLoad: function (options) {
    // 构建筛选项：全部 + 各分类
    const filters = [{ key: 'all', name: '全部' }].concat(
      data.categories.map(function (c) {
        return { key: c.key, name: c.name };
      })
    );
    this.setData({ filters: filters });

    // 如果从首页分类入口进入，带上 key 参数
    const key = options.key || 'all';
    this.setData({ currentKey: key });
    this.loadProducts(key);
  },

  // 按分类加载商品
  loadProducts: function (key) {
    this.setData({ products: data.getProductsByCategory(key) });
  },

  // 点击分类筛选
  onFilterTap: function (e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ currentKey: key });
    this.loadProducts(key);
  },

  // 点击商品进入详情
  onProductTap: function (e) {
    wx.navigateTo({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id });
  },

  // 去询价
  goInquiry: function () {
    wx.switchTab({ url: '/pages/inquiry/inquiry' });
  }
});
