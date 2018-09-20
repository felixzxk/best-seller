import React, { Component } from 'react';
import { Icon } from 'antd';
import { Button, List, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Picker from './components/Picker';
import styles from './index.less';

const areaData = require('../../utils/area.json');
console.log(areaData);
const Item = List.Item;

class Editor extends Component {
  state = {
    options: null,
    areaTitle: '',
    area: [],
    areaValue: {},
  };
  chosseArea = () => {
    this.setState({
      options: areaData.c['410000'],
    });
  };
  areaChange = data => {
    switch (this.state.area.length) {
      case 0: {
        const newTitle = data.name;
        const newOptions = areaData.part[data.id];
        const newArea = [data.id];
        this.setState({
          options: newOptions,
          areaTitle: newTitle,
          area: newArea,
          areaValue: {
            id: newArea,
            name: newTitle,
          },
        });
        break;
      }
      case 1: {
        const area = [...this.state.area];
        area.push(data.id);
        this.setState({
          options: null,
          areaTitle: '',
          area: [],
          areaValue: {
            id: area,
            name: `${this.state.areaTitle}/${data.name}`,
          },
        });
        break;
      }
      default: {
      }
    }
  };
  renderOptions = (data, index) => {
    return (
      <div
        className={styles.pickerItem}
        key={`area_${data.id}_${index}`}
        onClick={this.areaChange.bind(null, data)}
      >
        {data.name}
        <Icon type="right" style={{ color: '#ddd' }} />
      </div>
    );
  };
  onclClose = () => {
    this.setState({
      options: null,
      areaTitle: '',
      area: [],
    });
  };
  submit = () => {
    console.log(this.props.form);
    const {validateFields} = this.props.form;
    validateFields((error, values) => {
      if(!error){
        console.log(values)
      }
    })
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className={styles.wrap}>
        {this.state.options ? (
          <Picker
            title={this.state.areaTitle}
            data={this.state.options || []}
            renderOptions={this.renderOptions}
            onClose={this.onclClose}
          />
        ) : null}
        <div className={styles.formWrap}>
          <List className="myList">
            <Item extra={this.state.areaValue.name || '请选择'} onClick={this.chosseArea}>
              地区
            </Item>
            <InputItem
              {...getFieldProps('name', {
                rules: [{ required: true, message: '请输入真实姓名' }],
              })}
              clear
              error={!!getFieldError('name')}
              onErrorClick={() => {
                // alert(getFieldError('name').join('、'));
              }}
              placeholder="请输入真实姓名"
            >
              真实姓名
            </InputItem>
            <InputItem
              {...getFieldProps('mobile', {
                rules: [{ required: true, message: '请输入手机号' }],
              })}
              clear
              error={!!getFieldError('mobile')}
              onErrorClick={() => {
                // alert(getFieldError('name').join('、'));
              }}
              placeholder="请输入手机号"
            >
              手机号
            </InputItem>
            <InputItem
              {...getFieldProps('idCard', {
                rules: [{ required: true, message: '请输入身份证号' }],
              })}
              clear
              error={!!getFieldError('idCard')}
              onErrorClick={() => {
                // alert(getFieldError('name').join('、'));
              }}
              placeholder="请输入身份证号"
            >
              身份证号
            </InputItem>
            <InputItem
              {...getFieldProps('workNo', {
                rules: [{ required: true, message: '请输入工号' }],
              })}
              clear
              error={!!getFieldError('workNo')}
              onErrorClick={() => {
                // alert(getFieldError('name').join('、'));
              }}
              placeholder="请输入工号"
            >
              工号
            </InputItem>
          </List>
        </div>
        <div className={styles.btnWrap}>
          <Button type="primary" onClick={this.submit}>提交</Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ app, editor }) {
  return { app, editor };
}

export default connect(mapStateToProps)(createForm()(Editor));
