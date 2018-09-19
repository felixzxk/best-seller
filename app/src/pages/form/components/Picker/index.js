import React from 'react';
import { Icon } from "antd";
import styles from './index.less';

export default function Picker(props) {
  const renderOptions = data => data.map((d, i) => props.renderOptions(d, i));
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <a onClick={props.onClose}><Icon type="close" style={{color: '#f00'}} /></a> {props.title}
      </div>
      <div className={styles.options}>
        {renderOptions(props.data)}
      </div>
    </div>
  );
}
