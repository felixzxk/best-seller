import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'dva';
import { Input } from 'antd';
import styles from './index.less';
import Title from './Title';
import Topper from './Topper';
import { jump } from "../../../utils";

class Home extends Component {
  onSearch = keywords => {
    if(_.trim(keywords)){
      jump('/main/siblings', {keywords});
    }
  }
  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.header}>
          <Input.Search onSearch={this.onSearch} placeholder="请输入同事的姓名或工号查询" />
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
