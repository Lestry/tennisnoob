const SIDE_MENU = [{
  name: '管理员工具',
  key: 'tool',
  route: '/tool.*',
  icon: 'share-alt',
  sub: [{
    name: '场地整理',
    key: 'tool/court',
    route: '/tool/court.*',
    icon: 'share-alt'
  }, {
    name: '分组抽签',
    key: 'tool/draw',
    route: '/tool/draw.*',
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
