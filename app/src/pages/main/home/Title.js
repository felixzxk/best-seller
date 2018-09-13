import React from 'react';
import styles from './index.less';


export default function(props){
  return (
    <div className={styles.title}>{props.title}</div>
  )
}