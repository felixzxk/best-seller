import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, Input } from 'antd';
import styles from './index.less';
import Title from './Title';
import Topper from './Topper';

class Home extends Component {
  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.header}>
          <Input.Search placeholder="请输入同事的姓名或工号查询" />
          <Title title={this.props.info.name} />
        </div>
        <div className={styles.bodier}>
          {this.props.top ? <Topper data={this.props.top} /> : null}
        </div>
      </div>
    );
  }
}
function mapStateToProps({ home }) {
  return { ...home };
}
export default connect(mapStateToProps)(Home);
