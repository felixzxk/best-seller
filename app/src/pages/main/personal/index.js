import React, { Component } from 'react';
import { connect } from 'dva';
import { List } from 'antd-mobile';
import { Button, Icon } from 'antd';
import styles from './index.less';
import { addStars, jump } from '../../../utils';

const Item = List.Item;
const Label = props => {
  const style = {
    fontSize: '14px',
  };
  return <span style={style}>{props.title}</span>;
};
class Personal extends Component {
  edit = () => {
    jump('/edit', {data: JSON.stringify(this.props.user)})
  }
  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.personMain}>
          <img src={this.props.user.avatar} alt={this.props.user.name} />
          <div className={styles.name}>{this.props.user.name}</div>
          <Button className={styles.editor} size="small" type="primary" onClick={this.edit}>
            <Icon type="edit" />
            编辑
          </Button>
          <div className={styles.status}>
            <div>
              <h3>排名</h3>
              {this.props.status.ranking}
            </div>
            <div className={styles.rightStatus}>
              <h3>票数</h3>
              {this.props.status.count}
            </div>
          </div>
        </div>
        <div className={styles.list}>
          <List className="myList">
            <Item extra={this.props.user.areaText}>
              <Label title="地区" />
            </Item>
            <Item extra={addStars(this.props.user.mobile, 3, 4)}>
              <Label title="手机号" />
            </Item>
            <Item extra={addStars(this.props.user.idCard, 2, 12, 4)}>
              <Label title="身份证号" />
            </Item>
            <Item extra={this.props.user.workNo}>
              <Label title="工号" />
            </Item>
          </List>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ app }) {
  return app;
}

export default connect(mapStateToProps)(Personal);
