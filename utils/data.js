/**
 * utils/data.js
 * ------------------------------------------------------------
 * 商品与分类的本地数据模型。
 * 这里集中维护所有展示数据，方便你后续新增品类、修改商品信息，
 * 不需要改动页面逻辑代码。
 * ------------------------------------------------------------
 */

// 图片统一放在 assets/images 目录下，便于整体替换成真实照片
const IMG = '/assets/images/';

/**
 * 分类入口数据
 * key   : 分类标识（用于跳转商品列表时筛选）
 * name  : 分类名称
 * icon  : 分类图片
 * desc  : 一句话说明
 */
const categories = [
  { key: 'workwear', name: '工装', icon: IMG + 'cat-workwear.png', desc: '耐磨耐穿' },
  { key: 'jacket', name: '冲锋衣', icon: IMG + 'cat-jacket.png', desc: '防风防水' },
  { key: 'shirt', name: '衬衫', icon: IMG + 'cat-shirt.png', desc: '商务免烫' },
  { key: 'vest', name: '马甲', icon: IMG + 'cat-vest.png', desc: '多口袋' },
  { key: 'custom', name: '定制打样', icon: IMG + 'cat-custom.png', desc: '来图定制' }
];

/**
 * 商品数据
 * id        : 商品唯一标识
 * category  : 所属分类 key（对应上面的分类）
 * name      : 商品名称
 * image     : 主图
 * price     : 参考单价（元/件，仅作展示，实际以询价报价为准）
 * moq       : 起订量（件）
 * specs     : 可选规格（颜色 / 面料）
 * sizes     : 可选尺码
 * desc      : 商品简介
 * details   : 报价与工艺说明（多行，展示在商品详情页）
 * hot       : 是否为热门商品（首页展示）
 */
const products = [
  {
    id: 'p001',
    category: 'workwear',
    name: '经典工装套装',
    image: IMG + 'prod-workwear.png',
    price: 128,
    moq: 50,
    specs: ['藏青', '深灰', '卡其', '涤棉面料', '纯棉面料'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    desc: '耐磨面料，多口袋设计，适合车间、工程、物流等场景',
    details: [
      '面料：涤棉混纺 / 全棉斜纹可选，320g 加厚耐磨',
      '工艺：可刺绣或热转印企业 LOGO，支持来图来样',
      '颜色：藏青、深灰、卡其等现货色，可按需定制潘通色',
      '报价：50 件起订，量大从优；含基础刺绣 LOGO，具体以实际报价为准',
      '交期：确认样衣后 7-12 个工作日，急单可协商'
    ],
    hot: true
  },
  {
    id: 'p002',
    category: 'jacket',
    name: '三合一冲锋衣',
    image: IMG + 'prod-jacket.png',
    price: 268,
    moq: 30,
    specs: ['藏青', '黑色', '红色', '防水面料', '加厚抓绒内胆'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    desc: '防风防水，可拆卸内胆，适合户外作业与团体活动',
    details: [
      '面料：高密度防水透气面料，接缝压胶处理',
      '结构：外壳 + 可拆卸抓绒内胆，一衣三穿',
      '工艺：支持胸前/后背 LOGO 刺绣、反光印字',
      '报价：30 件起订，阶梯价格，含基础 LOGO 定制',
      '交期：确认样衣后 10-15 个工作日'
    ],
    hot: true
  },
  {
    id: 'p003',
    category: 'shirt',
    name: '商务免烫衬衫',
    image: IMG + 'prod-shirt.png',
    price: 88,
    moq: 50,
    specs: ['白色', '浅蓝', '深蓝', '免烫面料', '竹纤维面料'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    desc: '挺括有型，免烫易打理，可绣 LOGO 的商务衬衫',
    details: [
      '面料：60% 棉 DP 免烫处理，抗皱易打理',
      '版型：修身/标准版可选，支持量体定制',
      '工艺：左胸刺绣 LOGO，支持多色绣线',
      '报价：50 件起订，量大专享折扣',
      '交期：确认样衣后 7-10 个工作日'
    ],
    hot: true
  },
  {
    id: 'p004',
    category: 'vest',
    name: '多功能工装马甲',
    image: IMG + 'prod-vest.png',
    price: 68,
    moq: 50,
    specs: ['藏青', '橘红', '荧光绿', '多口袋款', '反光条款'],
    sizes: ['M', 'L', 'XL', '2XL', '3XL'],
    desc: '多口袋、反光条设计，适合工程、仓储、物业等场景',
    details: [
      '面料：加厚牛津布，耐磨防撕裂',
      '细节：多工具口袋，可加反光条提升夜间安全性',
      '工艺：支持刺绣/丝印企业标识',
      '报价：50 件起订，量大从优',
      '交期：确认样衣后 7-10 个工作日'
    ],
    hot: true
  },
  {
    id: 'p005',
    category: 'custom',
    name: '企业团体定制',
    image: IMG + 'prod-custom.png',
    price: 0,
    moq: 30,
    specs: ['T恤', 'POLO衫', '卫衣', '帽衫', '来图来样'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    desc: '来图来样，免费设计打样，一站式团队服装定制',
    details: [
      '服务：提供免费设计排版与实物打样（打样费可抵货款）',
      '品类：T恤、POLO、卫衣、冲锋衣、工装等全品类定制',
      '工艺：刺绣、丝网印、热转印、数码直喷等多种选择',
      '报价：根据款式、数量、工艺综合报价，30 件起订',
      '交期：打样 3-5 天，大货 7-15 个工作日'
    ],
    hot: true
  },
  {
    id: 'p006',
    category: 'shirt',
    name: '定制POLO衫',
    image: IMG + 'prod-polo.png',
    price: 58,
    moq: 50,
    specs: ['白色', '藏青', '红色', '精梳棉', '速干面料'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    desc: '透气舒适，团队活动、门店工服首选',
    details: [
      '面料：精梳棉 / 速干面料可选，亲肤透气',
      '工艺：左胸刺绣或丝印 LOGO',
      '颜色：多色现货可选，支持定制染色',
      '报价：50 件起订，量大从优',
      '交期：确认样衣后 7-10 个工作日'
    ],
    hot: false
  }
];

module.exports = {
  IMG,
  categories,
  products,
  // 根据 id 查找商品
  getProductById(id) {
    return products.find(function (p) { return p.id === id; }) || null;
  },
  // 根据分类 key 查找商品（custom 分类返回全部，便于展示）
  getProductsByCategory(key) {
    if (!key || key === 'custom' || key === 'all') return products;
    return products.filter(function (p) { return p.category === key; });
  }
};
