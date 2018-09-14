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
      payload: {refresh: true}
    });
  };
  loadMore = () => {
    this.props.dispatch({
      type: 'funs/load',
    });
  };
  render() {
    return (
      <FlatList
        data={this.props.list}
        isLoading={this.props.isLoading}
        renderRow={this.row}
        allowLoadMore
        threshold={120}
        onPull={this.refresh}
        onPush={this.loadMore}
      />
    );
  }
}

function mapStateToProps({ funs }) {
  return funs;
}

export default connect(mapStateToProps)(Funs);
