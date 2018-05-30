import React from 'react';
import PropTypes from 'prop-types';

// store
import { connect } from 'dva';

// 工具方法
import _ from 'lodash';

// 常量
import { SIDE_MENU } from '../../constants/index';

// 组件
import { Icon, Menu } from 'antd';

// 引入antd全局样式
import 'antd/dist/antd.css';
// 引入main样式
import './main.less';

// 匹配当前路由
const getCurrentRoute = (location) => {
  const url = location ? location.pathname : '';
  const mainRoute = _.find(SIDE_MENU, menu => (new RegExp(menu.route).test(url)));
  const subRoute = mainRoute && Array.isArray(mainRoute.sub) ?
    _.find(mainRoute.sub, subMenu => (new RegExp(subMenu.route).test(url))) : null
  return {
    mainRoute,
    subRoute
  };
}

class Main extends React.PureComponent {
  static propTypes = {
    children: PropTypes.array
  };

  render() {
    const { children } = this.props;
    return (
      <div id="page">
        <div className="page-header">
          <div className="brand">
          </div>
        </div>
        <div className="container page-container" id="page-container">
          {this.renderSideMenu()}
          <div className="page-main" id="page-main" style={this.STYLES.pageMain}>
            {children}
          </div>
        </div>
      </div>
    )
  }

  // 渲染侧边菜单
  renderSideMenu() {
    const currRoute = getCurrentRoute(this.props.location)
    const mainRouteKey = currRoute.mainRoute ? currRoute.mainRoute.key : ''
    const subRouteKey = currRoute.subRoute ? currRoute.subRoute.key : mainRouteKey
    const defaultOpenMenus = SIDE_MENU.map(m => m.key)
    return (
      <div className="page-side-menu-container">
        <Menu
          mode="inline"
          className="page-side-menu"
          style={{ height: '100%' }}
          selectedKeys={[subRouteKey]}
          defaultOpenKeys={defaultOpenMenus}
          onClick={this.handleSelectMenu.bind(this)}
        >
          {
            SIDE_MENU.map((item) => {
              if (Array.isArray(item.sub) && item.sub.length > 0) {
                const subs = item.sub.map(subItem => (
                  <Menu.Item key={subItem.key} style={this.STYLES.menuItem}>
                    <Icon type={subItem.icon} />
                    {subItem.name}
                  </Menu.Item>
                ))
                return (
                  <Menu.SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
                    {subs}
                  </Menu.SubMenu>
                )
              }
              return (
                <Menu.Item key={item.key} style={this.STYLES.menuItem}>
                  <Icon type={item.icon} />
                  {item.name}
                </Menu.Item>
              )
            })
          }
        </Menu>
      </div>
    )
  }

  // 点击菜单
  handleSelectMenu(params) {
    const { key } = params;
    const { history } = this.props;
    history.push(key);
  }

  STYLES = {
    menuItem: {
      fontSize: '14px'
    }
  }
}

export default connect()(Main);
