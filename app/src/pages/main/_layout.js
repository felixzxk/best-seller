import React, { Component } from 'react';
import { Icon } from 'antd';
import _ from 'lodash';
import { connect } from 'dva';
import TabBar, { Item } from './components/TabBar';
import {jump} from '../../utils'
import styles from './_layout.less';

const TabBarIcon = ({ color = '#aaa', theme = 'twoTone', type, size = 22 }) => {
  const style = { fontSize: `${size}px` }
  const props = {
    type,
    theme,
    style
  }
  if(theme === 'twoTone') {
    props.twoToneColor = color
  }else {
    props.style = {...style, color }
  }
  return (
    <Icon {...props} />
  );
};
class Layout extends Component {
  isActive = (key) => _.includes(this.props.location.pathname, key);
  tabBarBorderTopColor = () => {
    switch(true){
      case this.isActive('/home'): {
        return '#f5980e'
      }
      case this.isActive('/funs'): {
        return '#f31e7b'
      }
      case this.isActive('/personal'): {
        return '#46a8f9'
      }
      default: {
        return '#f00'
      }
    }
  }
  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.content}>{this.props.children}</div>
        <div className={styles.navigater}>
          <TabBar hidden={false} color={this.tabBarBorderTopColor()}>
            <Item
              title="排行"
              key="home"
              color="#999"
              selectedColor="#ffbc4c"
              icon={<TabBarIcon type="trophy" />}
              selectedIcon={<TabBarIcon type="trophy" theme="filled" color="#f5980e" />}
              onPress={() => jump('/main/home', {}, true)}
              selected={this.isActive('/home')}
            />
            <Item
              title="粉丝"
              key="funs"
              color="#999"
              selectedColor="#f31e7b"
              icon={<TabBarIcon type="heart" />}
              selectedIcon={<TabBarIcon type="heart" theme="filled" color="#f31e7b" />}
              onPress={() => jump('/main/funs', {}, true)}
              selected={this.isActive('/funs')}
            />
            <Item
              title="我的"
              key="my"
              color="#999"
              selectedColor="#46a8f9"
              icon={<TabBarIcon type="setting" />}
              selectedIcon={<TabBarIcon type="setting" theme="filled" color="#46a8f9" />}
              onPress={() => jump('/main/personal', {}, true)}
              selected={this.isActive('/personal')}
            />
          </TabBar>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(Layout);
