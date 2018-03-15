const SIDE_MENU = [{
  name: '工具',
  key: '/tool',
  route: '/tool.*',
  icon: 'share-alt',
  sub: [{
    name: '场地整理',
    key: '/tool/court',
    route: '/tool/court.*',
    icon: 'share-alt'
  }, {
    name: '分组抽签',
    key: '/tool/draw',
    route: '/tool/draw.*',
    icon: 'share-alt'
  }]
}, {
  name: '场地',
  key: '/court',
  route: '/court.*',
  icon: 'share-alt',
  sub: [{
    name: '场地列表',
    key: '/court/list',
    route: '/court/list.*',
    icon: 'share-alt'
  }, {
    name: '贡献数据',
    key: '/court/data',
    route: '/court/data.*',
    icon: 'share-alt'
  }]
}]

const FORM_ITEM_LAYOUT = {
  labelCol: {
    sm: { span: 2 }
  },
  wrapperCol: {
    sm: { span: 8 }
  }
}

export {
  SIDE_MENU,
  FORM_ITEM_LAYOUT
}
