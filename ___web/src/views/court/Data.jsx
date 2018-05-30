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
        <div className="page-title">
          贡献数据
        </div>
        <div className="module-content">

        </div>
      </div>
    )
  }
}

export default connect()(CourtData);
