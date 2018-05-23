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
      <div>
        贡献数据
      </div>
    )
  }
}

export default connect()(CourtData);
