import React, { Component } from 'React';
import _ from 'lodash';
import styles from './index.less';

export default class FlatList extends Component {
  renderRows = data => {
    if (_.isFunction(this.props.renderRow)) {
      return _.map(data, (d, i) => {
        return this.props.renderRow(d, i);
      });
    }
    throw new Error('renderRow must be a function, and return a React Element');
  };
  render() {
    if (this.props.data.length < 1) {
      return <div className={styles.emptyText}>{this.props.emptyText || '暂无数据'}</div>;
    }
    return (
      <div className={this.props.className} style={this.props.style}>
        {this.renderRows(this.props.data)}
      </div>
    );
  }
}
