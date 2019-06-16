import React from 'react';
// import PropTypes from 'prop-types';

import { connect } from 'dva';

class ContributeData extends React.PureComponent {
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
      <div className="module-container">
        贡献数据(开发中)
      </div>
    )
  }
}

export default connect()(ContributeData);
