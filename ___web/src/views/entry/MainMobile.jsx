import React from 'react';

import { Button, InputNumber } from 'antd';

import classnames from 'classnames';
import Clipboard from 'clipboard';
import { courtTranslate } from '../../utils/courtUtils';
import draw from '../../utils/draw';

// 引入antd全局样式
import 'antd/dist/antd.css';
// 引入main-mobile样式
import './main-mobile.less';

class MainMobile extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      // 当前所在tab
      key: this.TABS[0],
      // 待整理场地
      inputValue: '',
      // 场地整理结果
      outputValue: {},
      // 抽签信息
      drawValue: '',
      // 分组人数
      groupNum: 4,
      // 抽签结果
      drawResult: {},
      // 是否已抽签
      drawed: false
    }

    this.courtClip = null;
    this.drawClip = null;
  }

  componentDidMount() {
    this._initClip(this.state.key)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.key !== this.state.key) {
      this._initClip(this.state.key)
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
              id="mobile-tool-court-copy-btn"
              type="primary"
              size="small"
              disabled={!outputValue.result}
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
    const { drawValue, groupNum, drawResult, drawed } = this.state;

    return (
      <div className="match-draw">
        <div className="draw-value a-left-right">
          <div className="action-title">
            参赛人员表（以逗号分割，结尾不要逗号）
            <Button type="primary" size="small" onTouchEnd={this.handleResetDrawValue.bind(this)}>
              重置
            </Button>
          </div>
          <textarea
            style={{ height: 'calc(100% - 35px)'}}
            className="court-text-input-area"
            onChange={this.handleChangeDrawValue.bind(this)}
            value={drawValue}
          />
        </div>
        <div className="draw-actions a-left-right">
          <InputNumber
            style={{ width: '50%' }}
            min={1}
            defaultValue={groupNum}
            value={groupNum}
            size="large"
            onChange={this.handleChangeGroupNum.bind(this)}
          />
          <Button
            type="primary"
            size="large"
            style={{ width: '35%', float: 'right' }}
            disabled={drawed || !drawValue}
            onTouchEnd={this.handleDraw.bind(this)}
          >
            抽签
          </Button>
        </div>
        <div className="draw-result a-left-right">
          <div className="action-title">
            结果
            <span style={{ color: '#cb3333', paddingLeft: '8px' }}>{drawResult.msg}</span>
            <Button
              id="mobile-tool-draw-copy-btn"
              type="primary"
              size="small"
              disabled={!drawResult.result}
            >
              复制
            </Button>
          </div>
          <textarea
            style={{ height: 'calc(100% - 35px)' }}
            ref={(node) => { this.drawedText = node }}
            className="court-text-input-area"
            readOnly
            value={this._getDrawedResult()}
          />
        </div>
      </div>
    )
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

  // 输入带抽签队员
  handleChangeDrawValue(e) {
    const v = e.target.value;
    this.setState({
      drawValue: v
    })
  }

  // 重置抽签信息
  handleResetDrawValue() {
    this.setState({
      drawValue: '',
      groupNum: 4,
      drawResult: {},
      drawed: false
    })
  }

  // 切换人数信息
  handleChangeGroupNum(v) {
    this.setState({
      groupNum: v
    })
  }

  // 进行抽签
  handleDraw() {
    const { drawValue, groupNum } = this.state
    const res = draw(drawValue.replace(/[\n\r\s]/g, '').split(/[,，]/), groupNum);
    if (res.result) {
      this.setState({
        drawed: true,
        drawResult: res
      })
    } else {
      this.setState({
        drawed: false,
        drawResult: res
      })
    }
  }

  // 切换tab
  handleChangeTab(name) {
    this.setState({
      key: name
    })
  }

  _getDrawedResult() {
    const { drawValue, drawed, drawResult } = this.state

    let arr = drawValue.replace(/[\n\r\s]/g, '').split(/[,，]/);
    if (arr.length === 1 && !arr[0].trim()) {
      return '';
    } else {
      if (drawed && drawResult.data) {
        let str = '';
        Object.keys(drawResult.data).forEach((k) => {
          str += `===== 第 ${k} 组 =====\n`;
          str += drawResult.data[k].map((item, index) => {
            return `No.${index + 1} ${item}`;
          }).join('\n');
          str += '\n';
        })
        return str;
      } else {
        return arr.map((item, index) => {
          return `No.${index + 1} ${item}`;
        }).join('\n');
      }
    }
  }

  // 初始化剪贴板
  _initClip(key) {
    // 如果key发生了变化时 销毁相应的clip对象
    if (key === this.TABS[0]) {
      // 场地整理tab 销毁抽签剪贴板
      if (this.drawClip && typeof this.drawClip.destroy === 'function') {
        this.courtClip.destroy();
      }
      // 初始化场地整理剪贴板
      this.courtClip = new Clipboard('#mobile-tool-court-copy-btn', {
        target: () => this.formatedText
      });
    } else {
      // 抽签tab 销毁场地整理剪贴板
      if (this.courtClip && typeof this.courtClip.destroy === 'function') {
        this.courtClip.destroy();
      }
      // 初始化抽签剪贴板
      this.drawClip = new Clipboard('#mobile-tool-draw-copy-btn', {
        target: () => this.drawedText
      });
    }
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
