import React from 'react';
import { connect } from 'dva';
import FlatLister from '../components/FlatLister';

class Funs extends React.PureComponent {
  row = (rowData, rowID) => {
    console.log('rowData', rowData);
    return <div key={rowID} style={{height: '90px'}}>{JSON.stringify(rowData)}</div>;
  };
  render() {
    return <FlatLister data={this.props.list} renderRow={this.row} />;
  }
}

function mapStateToProps({ funs }) {
  return funs;
}

export default connect(mapStateToProps)(Funs);
