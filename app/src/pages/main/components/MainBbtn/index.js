import React from 'react';
import styles from './index.less';

export default function MainBtn(props) {
  return (
    <div onClick={() => null} className={styles.wrap}>
      <div className={styles.inner}>
        {props.icon ? <div className={styles.icon}>{props.icon}</div> : null}
        <div className={styles.text}>{props.title || '分享'}</div>
      </div>
    </div>
  );
}
