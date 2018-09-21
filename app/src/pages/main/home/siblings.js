import React from 'react';
import _ from 'lodash';
import { Input } from "antd";
import { connect } from 'dva';
import FlatList from '../components/FlatList';
import styles from './index.less';

function Siblings(props) {
  const onSearch = (keywords) => {
    if (_.trim(keywords)) {
      props.dispatch({
        type: 'siblings/search',
        payload: { keywords }
      });
    }
  }
  const renderRow = (data, index) => {
    return JSON.stringify(data)
  };

  console.log(props)
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <Input.Search onSearch={onSearch} placeholder="请输入同事的姓名或工号查询" />
      </div>
      <div className={styles.list}>
        <FlatList data={props.data} renderRow={renderRow} />
      </div>
    </div>
  )
}

function mapStateToProps({ siblings }) {
  return siblings
}

export default connect(mapStateToProps)(Siblings);