import React from 'react';
import { connect } from 'dva';
import FlatLister from '../components/FlatLister';

class Funs extends React.PureComponent {
  row = (rowData, rowID) => {
    return <div key={rowID} style={{ height: '60px'}}>{rowData.name}</div>;
  };
  render() {
    return <FlatLister data={this.props.list} renderRow={this.row} />;
  }
}

function mapStateToProps({ funs }) {
  return funs;
}

export default connect(mapStateToProps)(Funs);
