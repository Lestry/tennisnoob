import React from 'react';

import { Button } from 'antd';

import classnames from 'classnames';
import { courtTranslate } from '../../utils/courtUtils';

// 引入antd全局样式
import 'antd/dist/antd.css';
// 引入main样式
import './main-mobile.less';

class MainMobile extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      key: this.TABS[0],
      inputValue: '',
      outputValue: {}
    }
  }

  render() {
    const { key } = this.state;

    return (
      <div id="page" className="a-left-right">
        <div className="page-header a-left-right" style={this.STYLES.header}>
          {key}
        </div>
        <div className="page-container a-left-right" id="page-container" style={this.STYLES.container}>
          {key === this.TABS[0] && this.renderCourtFormat()}
          {key === this.TABS[1] && this.renderMatchDraw()}
        </div>
        <ul className="page-bottom page-tab-bar a-left-right" style={this.STYLES.bottom}>
          {
            this.TABS.map(item => (
              <li key={`mobile-page-bottom-tab-bar-item-${item}`}
                className={classnames('page-tab-item', { active: key === item })}
                onTouchEnd={this.handleChangeTab.bind(this, item)}
              >
                {item}
              </li>
            ))
          }
        </ul>
      </div>
    )
  }

  // 渲染场地整理
  renderCourtFormat() {
    const { inputValue, outputValue } = this.state;

    return (
      <div className="court-format">
        <div className="unformat-court a-left-right">
          <div className="action-title">
            请输入待整理场地
            <Button type="primary" size="small" onTouchEnd={this.handleResetCourtValue.bind(this)}>
              重置
            </Button>
          </div>
          <textarea
            style={{ height: 'calc(100% - 35px)'}}
            ref={(node) => { this.unformatedText = node }}
            className="court-text-input-area"
            onChange={this.handleChangeInput.bind(this)}
            value={inputValue}
          />
        </div>
        <div className="court-actions a-left-right">
          <Button
            type="primary"
            size="small"
            disabled={!outputValue}
            onTouchEnd={this.handleCourtAction.bind(this, 'format')}
          >
            整理场地
          </Button>
          <Button
            type="primary"
            size="small"
            disabled={!outputValue}
            onTouchEnd={this.handleCourtAction.bind(this, 'count')}
          >
            统计贡献
          </Button>
        </div>
        <div className="formated-court a-left-right">
          <div className="action-title">
            结果
            <span style={{ color: '#cb3333', paddingLeft: '8px' }}>{outputValue.msg}</span>
            <Button
              type="primary"
              size="small"
              disabled={!outputValue.result}
              onTouchEnd={this.handleCopyformatedText.bind(this)}
            >
              复制
            </Button>
          </div>
          <textarea
            style={{ height: 'calc(100% - 35px)' }}
            ref={(node) => { this.formatedText = node }}
            className="court-text-input-area"
            readOnly
            value={outputValue.data}
          />
        </div>
      </div>
    )
  }

  // 渲染比赛抽签
  renderMatchDraw() {

  }

  // 重置场地整理
  handleResetCourtValue() {
    this.setState({
      inputValue: '',
      outputValue: {}
    })
  }

  // 场地处理方法
  handleCourtAction(mode) {
    const result = courtTranslate(this.state.inputValue, mode);
    this.setState({
      outputValue: result
    })
  }

  // 写入待整理场地
  handleChangeInput(e) {
    const v = e.target.value;
    this.setState({
      inputValue: v
    })
  }

  // 复制整理好的场地
  handleCopyformatedText() {
    this.formatedText.select()
    document.execCommand('Copy')
    this.formatedText.blur()
  }

  // 切换tab
  handleChangeTab(name) {
    this.setState({
      key: name
    })
  }

  TABS = ['场地整理', '比赛抽签'];

  STYLES = {
    // 顶部菜单栏
    header: {
      background: '#a3bb6f',
      fontSize: '20px',
      color: '#fff',
      lineHeight: '50px',
      textAlign: 'center'
    },
    // 中部主要容器
    container: {
      background: '#f4f4f4'
    },
    // 底部tab导航
    bottom: {
      background: '#fff'
    }
  }
}

export default MainMobile
