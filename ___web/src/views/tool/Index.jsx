import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dva';

class ToolIndex extends React.PureComponent {
  static propTypes = {
    
  };

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <div>
        工具
      </div>
    )
  }
}

export default connect()(ToolIndex);
