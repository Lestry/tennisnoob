import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';

import { connect } from 'dva';

import { SIDE_MENU } from '../constants/index';

// 引入antd全局样式
import 'antd/dist/antd.css';
// 引入main样式
import './main.less';

// 匹配当前路由
const getCurrentRoute = (location) => {
  const url = location.pathname;

  const currentRoute = SIDE_MENU.filter(menu => (new RegExp(menu.route).test(url)));

  return currentRoute.length === 1 ? currentRoute[0].key : '';
}

class Main extends React.PureComponent {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;
    return (
      <div style={this.STYLES.page}>
        <div className="page-header" style={this.STYLES.header}>
          <div className="brand" style={this.STYLES.brand}>
          </div>
        </div>
        <div className="container page-container" id="page-container" style={this.STYLES.pageContainer}>
          {this.renderSideMenu()}
          <div className="page-main" id="page-main" style={this.STYLES.pageMain}>
            <div className="page-main-title" style={this.STYLES.pageTitle}>
            </div>
            {children}
          </div>
        </div>
      </div>
    )
  }

  // 渲染侧边菜单
  renderSideMenu() {
    const activeMenu = getCurrentRoute(this.props.location)

    return (
      <div className="page-side-menu-container" style={this.STYLES.pageSideMenu}>
        <Menu
          mode="inline"
          className="page-side-menu"
          style={{ height: '100%' }}
          selectedKeys={[activeMenu]}
          openKeys={[activeMenu]}
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
    this.context.router.push(`/${key}`);
  }

  STYLES = {
    // 浏览器区域
    page: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 0
    },
    // 顶部菜单栏
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 50,
      background: '#a3bb6f'
    },
    // logo位
    brand: {
      float: 'left',
      width: 200,
      height: 50,
      margin: 0,
      padding: '8px 0 0 20px'
    },
    // 页面主要区域
    pageContainer: {
      position: 'absolute',
      top: 50,
      left: 0,
      right: 0,
      bottom: 0,
    },
    // 左侧菜单区域
    pageSideMenu: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: 200,
      background: '#fff'
    },
    menuItem: {
      fontSize: '14px'
    },
    // router显示区
    pageMain: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 200,
      right: 0,
      paddingTop: 40
    },
    // 主视图顶部
    pageTitle: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      height: 40,
      padding: '0 20px'
    },
  }
}

export default connect()(Main);
