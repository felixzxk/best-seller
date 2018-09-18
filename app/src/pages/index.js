import styles from './index.css';
import {jump} from '../utils'

export default function() {
  const gotomain = (e) =>{
    e.preventDefault();
    jump('/main')
  }
  return (
    <div className={styles.normal}>
      <a onClick={gotomain}>login success</a>
    </div>
  );
}
