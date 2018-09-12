import React, { Component } from 'react';
import { Icon } from 'antd';
import TabBar, { Item } from './components/TabBar';
import { connect } from 'dva';
import styles from './_layout.less';

const TabBarIcon = ({ color = '#999', type, size = 22 }) => {
  return (
    <Icon type={type} theme="twoTone" twoToneColor={color} style={{ fontSize: `${size}px` }} />
  );
};
class Layout extends Component {
  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.content}>{this.props.children}</div>
        <i className="fa fa-address-book" aria-hidden="true" />
        <div className={styles.navigater}>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={false}
            noRenderContent
          >
            <Item
              title="排行"
              key="home"
              icon={<TabBarIcon type="trophy" />}
              onPress={() => false}
            />
            <Item title="粉丝" icon={<TabBarIcon type="heart" />} key="funs" />
            <Item title="我的" key="my" icon={<TabBarIcon type="setting" />} />
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
