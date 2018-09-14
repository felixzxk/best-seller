import React from 'react';
import { connect } from 'dva';
import FlatList from '../components/FlatList';

class Funs extends React.PureComponent {
  row = (rowData, rowID) => {
    return (
      <div key={rowID} style={{ height: '60px' }}>
        {rowData.name}
      </div>
    );
  };
  refresh = () => {
    this.props.dispatch({
      type: 'funs/load',
    })
  }
  render() {
    console.log('业务组件', this.props.isLoading)
    return <FlatList data={this.props.list} isLoading={this.props.isLoading} renderRow={this.row} threshold={120} onPull={this.refresh} />;
  }
}

function mapStateToProps({ funs }) {
  return funs;
}

export default connect(mapStateToProps)(Funs);
