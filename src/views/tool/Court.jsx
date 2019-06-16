import React from 'react';
// import PropTypes from 'prop-types';

import { connect } from 'dva';

import { courtTranslate } from '../../utils/courtUtils';

import { message, Input, Button } from 'antd';

class ToolCourt extends React.PureComponent {
  // static propTypes = {
    
  // };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      outputValue: {}
    };
  }

  render() {
    const { inputValue, outputValue } = this.state;

    return (
      <div className="module-container">
        <div className="left" style={this.STYLES.left}>
          <div className="name" style={this.STYLES.name}>
            待整理场地
            <Button
              type="primary"
              disabled={!inputValue}
              style={this.STYLES.actionBtn}
              onClick={this.handleCourtAction.bind(this, 'format')}
            >
              整理场地
            </Button>
            <Button
              type="primary"
              disabled={!inputValue}
              style={this.STYLES.actionBtn}
              onClick={this.handleCourtAction.bind(this, 'count')}
            >
              统计贡献
            </Button>
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
            value={outputValue.data}
            readOnly
          />
        </div>
      </div>
    )
  }

  // 修改待整理场地
  handleChangeInputValue(e) {
    const v = e.target.value;
    this.setState({
      inputValue: v
    })
  }

  // 场地处理方法
  handleCourtAction(mode) {
    const result = courtTranslate(this.state.inputValue, mode);
    if (!result.result) {
      message.error(result.msg)
    }
    this.setState({
      outputValue: result
    })
  }

  // 重置
  handleReset() {
    this.setState({
      inputValue: '',
      outputValue: {}
    })
  }

  // 复制整理后的信息
  handleCopyFormatedText() {
    this.formatedText.textAreaRef.select();
    document.execCommand('Copy');
  }

  STYLES = {
    left: { width: 'calc(50% - 30px)', position: 'absolute', left: '20px', top: 0, bottom: '20px', paddingTop: '50px' },
    name: { lineHeight: '50px', padding: '0 0 0 10px', position: 'absolute', left: 0, top: 0, width: '100%', height: '50px' },
    textarea: { width: '100%', height: '100%', resize: 'none' },
    right: { position: 'absolute', width: 'calc(50% - 30px)', right: '20px', top: 0, bottom: '20px', paddingTop: '50px' },
    actionBtn: { float: 'right', marginTop: '10px', marginLeft: '5px' }
  }
}

export default connect()(ToolCourt);
