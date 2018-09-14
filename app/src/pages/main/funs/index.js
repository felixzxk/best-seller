import React from 'react';
import { connect } from 'dva';
import FlatList from '../components/FlatList';
import PageControl from '../components/PageControl';
import styles from './index.less';
import { fromNow } from '../../../utils';

class Funs extends React.PureComponent {
  row = (rowData, rowID) => {
    return (
      <div key={rowID} className={styles.listItem} style={{backgroundColor: rowID % 2 === 0 ? '#f5f5f5' : '#fff'}}>
        <img src={rowData.avatar} alt={rowData.name} />
        <div className={styles.customerInfo}>
          <span className={styles.name}>{rowData.name}</span>
          <span>{rowData.mobile}</span>
        </div>
        <div className={styles.time}>{fromNow(rowData.voteTime)}</div>
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
        <FlatList renderRow={this.row} data={this.props.list} className={styles.listWrap} />
      </PageControl>
    );
  }
}

function mapStateToProps({ funs }) {
  return funs;
}

export default connect(mapStateToProps)(Funs);
