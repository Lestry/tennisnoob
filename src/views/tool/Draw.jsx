import React from 'react';
// import PropTypes from 'prop-types';

import { connect } from 'dva';

import draw from '../../utils/draw';

import { message, Input, Button, InputNumber } from 'antd';

class ToolDraw extends React.PureComponent {
  static propTypes = {
    
  };

  constructor(props) {
    super(props);
    this.state = {
      // 抽签信息
      inputValue: '',
      // 分组人数
      groupNum: 4,
      // 抽签结果
      outputValue: {},
      // 是否已抽签
      drawed: false
    };
  }

  componentDidMount() {
    
  }

  render() {
    const { inputValue, groupNum, outputValue, drawed } = this.state;

    return (
      <div className="module-container">
        <div className="left" style={this.STYLES.left}>
          <div className="name" style={this.STYLES.name}>
            参赛人员表（以逗号分割，结尾不要逗号）
            <Button
              type="primary"
              disabled={drawed || !inputValue}
              style={this.STYLES.actionBtn}
              onClick={this.handleDraw.bind(this)}
            >
              抽签
            </Button>
          </div>
          <div className="group-number" style={this.STYLES.groupNum}>
            每组人数
            <InputNumber
              style={this.STYLES.numberInput}
              min={1}
              defaultValue={groupNum}
              value={groupNum}
              onChange={this.handleChangeGroupNum.bind(this)}
            />
          </div>
          <Input.TextArea
            style={this.STYLES.textarea}
            value={inputValue}
            onChange={this.handleChangeInputValue.bind(this)}
          />
        </div>
        <div className="right" style={this.STYLES.right}>
          <div className="name" style={this.STYLES.name}>
            结果
            <Button
              type="primary"
              disabled={!outputValue.result}
              style={this.STYLES.actionBtn}
              onClick={this.handleCopyFormatedText.bind(this)}
            >
              复制
            </Button>
            <Button
              type="primary"
              disabled={!inputValue}
              style={this.STYLES.actionBtn}
              onClick={this.handleReset.bind(this)}
            >
              重置
            </Button>
          </div>
          <Input.TextArea
            ref={(node) => { this.formatedText = node }}
            style={this.STYLES.textarea}
            value={this._getDrawedResult()}
            readOnly
          />
        </div>
      </div>
    )
  }

  // 修改待抽签名单
  handleChangeInputValue(e) {
    const v = e.target.value;
    this.setState({
      inputValue: v
    })
  }

  // 修改每组人数
  handleChangeGroupNum(groupNum) {
    this.setState({ groupNum })
  }

  // 进行抽签
  handleDraw() {
    const { inputValue, groupNum } = this.state
    const res = draw(inputValue.replace(/[\n\r\s]/g, '').split(/[,，]/), groupNum);
    if (res.result) {
      this.setState({
        drawed: true,
        outputValue: res
      })
    } else {
      this.setState({
        drawed: false,
        drawResult: res
      })
      message.error(res.msg)
    }
  }

  // 重置
  handleReset() {
    this.setState({
      inputValue: '',
      outputValue: {},
      drawed: false
    })
  }

  // 复制整理后的信息
  handleCopyFormatedText() {
    this.formatedText.textAreaRef.select();
    document.execCommand('Copy');
  }

  _getDrawedResult() {
    const { inputValue, drawed, outputValue } = this.state

    let arr = inputValue.replace(/[\n\r\s]/g, '').split(/[,，]/);
    if (arr.length === 1 && !arr[0].trim()) {
      return '';
    } else {
      if (drawed && outputValue.data) {
        let str = '';
        Object.keys(outputValue.data).forEach((k) => {
          str += `===== 第 ${k} 组 =====\n`;
          str += outputValue.data[k].map((item, index) => {
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

  STYLES = {
    left: { width: 'calc(50% - 30px)', position: 'absolute', left: '20px', top: 0, bottom: '20px', paddingTop: '100px' },
    groupNum: { lineHeight: '50px', padding: '0 0 0 10px', position: 'absolute', left: 0, top: '50px', width: '100%', height: '50px' },
    name: { lineHeight: '50px', padding: '0 0 0 10px', position: 'absolute', left: 0, top: 0, width: '100%', height: '50px' },
    numberInput: { width: '50%', float: 'right', marginTop: '10px' },
    textarea: { width: '100%', height: '100%', resize: 'none' },
    right: { position: 'absolute', width: 'calc(50% - 30px)', right: '20px', top: 0, bottom: '20px', paddingTop: '50px' },
    actionBtn: { float: 'right', marginTop: '10px', marginLeft: '5px' }
  }
}

export default connect()(ToolDraw);
