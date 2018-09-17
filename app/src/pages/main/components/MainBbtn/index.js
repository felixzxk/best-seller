import React, { PureComponent } from "react";
import styles from "./index.less";

export default function MainBtn(props) {
  return (
    <a onClick={() => null} className={styles.wrap}>
      {props.icon ? <div className={styles.icon}>
        {props.icon}
      </div> : null}
      <div className={styles.text}>{props.title || '分享'}</div>
    </a>
  )
} 