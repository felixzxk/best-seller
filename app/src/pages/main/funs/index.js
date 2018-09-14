import React from 'react';
import { connect } from 'dva';
import FlatList from '../components/FlatList';
import PageControl from '../components/PageControl';

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
      payload: { refresh: true },
    });
  };
  loadMore = () => {
    this.props.dispatch({
      type: 'funs/load',
    });
  };
  render() {
    return (
      <PageControl
        isLoading={this.props.isLoading}
        allowLoadMore
        threshold={120}
        onPull={this.refresh}
        onPush={this.loadMore}
      >
        <FlatList renderRow={this.row} data={this.props.list} />
      </PageControl>
    );
  }
}

function mapStateToProps({ funs }) {
  return funs;
}

export default connect(mapStateToProps)(Funs);
