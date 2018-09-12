import React, { Component } from 'react';
import _ from 'lodash';
import styles from './index.less';

export default class TabBar extends Component {
  checkItems = items => {
    return React.Children.map(items, (item, i) => {
      if (item.type === Item) {
        return item;
      }
      return null;
    });
  };
  render() {
    if (this.props.hidden) {
      return null;
    }
    return (
      <div className={styles.wrap}>
        {this.checkItems(this.props.children)}
      </div>
    );
  }
}
export const Item = function(props) {
  return (
    <a className={styles.item} onClick={props.onPress}>
      {props.selected ? (props.selectedIcon || null) : props.icon}
      <span style={{color: props.selected ? props.selectedColor : props.color}}>{props.title}</span>
    </a>
  );
};
