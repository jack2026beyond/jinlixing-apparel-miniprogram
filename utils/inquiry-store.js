/**
 * utils/inquiry-store.js
 * ------------------------------------------------------------
 * 询价单本地存储层（演示版本，数据保存在用户手机本地）。
 *
 * 说明：
 * - 当前为「本地存储演示版」，询价数据保存在客户自己的手机里，
 *   商家无法远程收到。适合界面演示和功能验证。
 * - 后续如需商家真正收到询盘，可将本文件的三个方法替换为云端实现
 *   （例如微信云开发数据库），页面调用方式保持不变。
 * - 上传的 Logo 图片通过 wx.saveFile 从临时路径转为永久路径，
 *   保证小程序重启后图片仍然可见。
 * ------------------------------------------------------------
 */

const STORAGE_KEY = 'jinlixing_inquiries'; // 本地存储的 key

/**
 * 读取全部询价单
 * @returns {Array} 询价单数组，按提交时间倒序
 */
function list() {
  try {
    const data = wx.getStorageSync(STORAGE_KEY);
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error('[inquiry-store] 读取询价单失败', e);
    return [];
  }
}

/**
 * 新增一条询价单
 * @param {Object} inquiry 询价数据
 * @returns {Object} { success: Boolean, id: String, error: String }
 */
function add(inquiry) {
  try {
    const records = list();
    const record = Object.assign({}, inquiry, {
      id: 'XJ' + Date.now(),      // 简单生成唯一编号
      createdAt: Date.now()       // 提交时间戳
    });
    records.unshift(record); // 最新提交的排在最前
    wx.setStorageSync(STORAGE_KEY, records);
    return { success: true, id: record.id };
  } catch (e) {
    console.error('[inquiry-store] 保存询价单失败', e);
    return { success: false, error: '本地存储写入失败' };
  }
}

/**
 * 将选中的临时图片保存为永久本地文件
 * @param {String} tempFilePath 微信返回的临时图片路径
 * @returns {Promise<String>} 永久文件路径；失败时 resolve 原临时路径
 */
function persistImage(tempFilePath) {
  return new Promise(function (resolve) {
    if (!tempFilePath) {
      resolve('');
      return;
    }
    wx.saveFile({
      tempFilePath: tempFilePath,
      success: function (res) {
        // res.savedFilePath 是永久路径
        resolve(res.savedFilePath || tempFilePath);
      },
      fail: function (err) {
        console.warn('[inquiry-store] 图片持久化失败，使用临时路径', err);
        resolve(tempFilePath);
      }
    });
  });
}

/**
 * 清空全部询价单（调试用）
 */
function clear() {
  try {
    wx.removeStorageSync(STORAGE_KEY);
    return { success: true };
  } catch (e) {
    return { success: false, error: '清空失败' };
  }
}

module.exports = {
  list: list,
  add: add,
  persistImage: persistImage,
  clear: clear
};
