/**
 * pages/inquiry/inquiry.js
 * 询价表单页逻辑：字段双向绑定、校验、图片上传、提交到本地存储
 *
 * 注意：本页使用本地存储（演示版）。
 * 若以后接入云端，只需把 onSubmit 中调用 store.add() 的部分
 * 改为调用云端接口，页面其余逻辑无需改动。
 */
const store = require('../../utils/inquiry-store.js');

Page({
  data: {
    form: {
      name: '',
      phone: '',
      quantity: '',
      style: '',
      remark: ''
    },
    errors: {},                 // 各字段校验错误提示
    images: [],                 // 已选择图片的临时路径（最多3张）
    styleOptions: [             // 款式可选项（可在 utils/data.js 中集中维护）
      '工装', '冲锋衣', '衬衫', '马甲', 'POLO衫', 'T恤', '卫衣', '其他/来图定制'
    ],
    styleIndex: 0,
    submitting: false
  },

  onLoad: function (options) {
    // 从商品详情页跳转过来时，预填款式与起订量提示
    if (options.style) {
      const style = decodeURIComponent(options.style);
      this.setData({ 'form.style': style });
    }
    if (options.moq) {
      this.setData({ moqTip: options.moq });
    }
  },

  // 普通输入框内容变化（字段通过 data-field 指定）
  onInput: function (e) {
    const name = e.currentTarget.dataset.field;
    if (name) {
      this.setData({ ['form.' + name]: e.detail.value });
      // 输入后清除该字段错误提示
      if (this.data.errors[name]) {
        this.setData({ ['errors.' + name]: '' });
      }
    }
  },

  // 款式选择
  onStyleChange: function (e) {
    const index = e.detail.value;
    this.setData({
      styleIndex: index,
      'form.style': this.data.styleOptions[index],
      'errors.style': ''
    });
  },

  // 选择图片
  chooseImage: function () {
    const self = this;
    const remain = 3 - this.data.images.length;
    wx.chooseMedia({
      count: remain,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      sizeType: ['compressed'],
      success: function (res) {
        const newImages = res.tempFiles.map(function (f) { return f.tempFilePath; });
        self.setData({ images: self.data.images.concat(newImages) });
      }
    });
  },

  // 预览图片
  previewImage: function (e) {
    const index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.images[index],
      urls: this.data.images
    });
  },

  // 删除图片
  removeImage: function (e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.images.slice();
    images.splice(index, 1);
    this.setData({ images: images });
  },

  // 表单校验
  validate: function () {
    const f = this.data.form;
    const errors = {};
    if (!f.name.trim()) {
      errors.name = '请填写联系人姓名';
    }
    if (!/^1\d{10}$/.test(f.phone.trim())) {
      errors.phone = '请填写正确的 11 位手机号';
    }
    if (!f.quantity || Number(f.quantity) <= 0) {
      errors.quantity = '请填写有效的定制数量';
    }
    if (!f.style) {
      errors.style = '请选择款式品类';
    }
    this.setData({ errors: errors });
    return Object.keys(errors).length === 0;
  },

  // 提交表单
  onSubmit: function () {
    if (!this.validate()) {
      wx.showToast({ title: '请检查表单填写', icon: 'none' });
      return;
    }
    const self = this;
    this.setData({ submitting: true });

    // 先把图片从临时路径转为永久路径，再保存询价单
    Promise.all(this.data.images.map(function (path) { return store.persistImage(path); }))
      .then(function (savedImages) {
        const inquiry = {
          name: self.data.form.name.trim(),
          phone: self.data.form.phone.trim(),
          quantity: Number(self.data.form.quantity),
          style: self.data.form.style,
          remark: self.data.form.remark.trim(),
          images: savedImages
        };
        const result = store.add(inquiry);
        self.setData({ submitting: false });
        if (result.success) {
          wx.redirectTo({
            url: '/pages/result/result?id=' + result.id + '&phone=' + inquiry.phone
          });
        } else {
          wx.showToast({ title: '提交失败，请重试', icon: 'none' });
        }
      })
      .catch(function (err) {
        console.error('[inquiry] 提交异常', err);
        self.setData({ submitting: false });
        wx.showToast({ title: '提交失败，请重试', icon: 'none' });
      });
  }
});
