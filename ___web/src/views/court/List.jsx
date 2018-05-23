import React from 'react';
// import PropTypes from 'prop-types';

import { connect } from 'dva';

class CourtList extends React.PureComponent {
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
        场地列表
      </div>
    )
  }
}

const stateToProps = state => {
  console.log('connect stateToProps', state)
  return {}
}

export default connect(stateToProps)(CourtList);
