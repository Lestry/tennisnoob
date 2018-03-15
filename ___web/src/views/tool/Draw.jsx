import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dva';

class ToolDraw extends React.PureComponent {
  static propTypes = {
    
  };

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        抽签工具
      </div>
    )
  }
}

export default connect()(ToolDraw);
