const SIDE_MENU = [{
  name: '工具',
  key: '/tool',
  route: '/tool.*',
  icon: 'tool',
  sub: [{
    name: '场地整理',
    key: '/tool/court',
    route: '/tool/court.*',
    icon: 'profile'
  }, {
    name: '分组抽签',
    key: '/tool/draw',
    route: '/tool/draw.*',
    icon: 'trophy'
  }]
}, {
  name: '数据',
  key: '/data',
  route: '/data.*',
  icon: 'area-chart',
  sub: [{
    name: '场地数据',
    key: '/data/court',
    route: '/data/court.*',
    icon: 'line-chart'
  }, {
    name: '贡献数据',
    key: '/data/contribute',
    route: '/data/contribute.*',
    icon: 'team'
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
