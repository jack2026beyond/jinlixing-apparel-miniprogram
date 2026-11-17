/**
 * pages/detail/detail.js
 * 商品详情页：展示商品信息，选择规格尺码，跳转询价并带上预填信息
 */
const data = require('../../utils/data.js');
const app = getApp();

Page({
  data: {
    product: null,
    selectedSpec: '', // 当前选中的规格
    selectedSize: ''  // 当前选中的尺码
  },

  onLoad: function (options) {
    const product = data.getProductById(options.id);
    if (product) {
      this.setData({
        product: product,
        selectedSpec: product.specs[0] || '',
        selectedSize: product.sizes[0] || ''
      });
      wx.setNavigationBarTitle({ title: product.name });
    }
  },

  onSelectSpec: function (e) {
    this.setData({ selectedSpec: e.currentTarget.dataset.value });
  },

  onSelectSize: function (e) {
    this.setData({ selectedSize: e.currentTarget.dataset.value });
  },

  // 电话咨询
  callPhone: function () {
    wx.makePhoneCall({ phoneNumber: app.globalData.contact.mobile.replace(/\s/g, '') });
  },

  // 提交询价：把商品、规格、尺码作为 URL 参数带到询价页预填
  goInquiry: function () {
    const p = this.data.product;
    const style = p.name + (this.data.selectedSpec ? ' / ' + this.data.selectedSpec : '') +
      (this.data.selectedSize ? ' / ' + this.data.selectedSize : '');
    wx.navigateTo({
      url: '/pages/inquiry/inquiry?style=' + encodeURIComponent(style) + '&moq=' + p.moq
    });
  }
});
