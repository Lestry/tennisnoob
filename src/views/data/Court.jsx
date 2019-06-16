import React from 'react';
// import PropTypes from 'prop-types';

import { connect } from 'dva';

class CourtData extends React.PureComponent {
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
        场地数据(开发中)
      </div>
    )
  }
}

const stateToProps = state => {
  // console.log('connect stateToProps', state)
  return {}
}

export default connect(stateToProps)(CourtData);
