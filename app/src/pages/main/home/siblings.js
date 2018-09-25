import React from 'react';
import _ from 'lodash';
import { Input } from "antd";
import { connect } from 'dva';
import FlatList from '../components/FlatList';
import commonStyles from './index.less';
import styles from './siblings.less';

function Siblings(props) {
  const onSearch = (keywords) => {
    if (_.trim(keywords)) {
      props.dispatch({
        type: 'siblings/search',
        payload: keywords
      });
    }
  }
  const onChange = e => {
    e.preventDefault();
    props.dispatch({
      type: 'siblings/upState',
      payload: { searchValue: e.target.value }
    });
  }
  const renderRow = (data, index) => {
    return (
      <div className={styles.item} key={`siblings_${index}`}>
        <div className={styles.itemCont}>
          <img src={data.avatar} alt={data.name} />
          <div className={styles.name}>{data.name}</div>
          <div className={styles.area}>{data.areaText}</div>
          <div className={styles.ranking}>第{data.ranking}名</div>
          <div className={styles.count}>{data.count}票</div>
        </div>
      </div>
    );
  };

  return (
    <div className={commonStyles.wrap}>
      <div className={commonStyles.header}>
        <Input.Search defaultValue={props.keywords} value={props.searchValue} onChange={onChange} onSearch={onSearch} placeholder="请输入同事的姓名或工号查询" />
        <div className={styles.resultInfo}>
          关键字: <span>{props.keywords}</span>, 共查询到 <span>{props.data.length}</span> 位同事
        </div>
      </div>
      <FlatList data={props.data} renderRow={renderRow} className={styles.wrap} />
    </div>
  )
}

function mapStateToProps({ siblings }) {
  return siblings
}

export default connect(mapStateToProps)(Siblings);