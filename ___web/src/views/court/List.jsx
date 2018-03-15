import React from 'react';
import PropTypes from 'prop-types';

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
    
  }

  render() {
    return (
      <div>
        场地整理
      </div>
    )
  }
}

export default connect()(CourtList);
