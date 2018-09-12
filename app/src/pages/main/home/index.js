import React, { Component } from "react";
import { connect } from "dva";
import { Icon } from "antd";

class Home extends Component {
  render(){
    return <div><Icon type="trophy" theme="twoTone" twoToneColor="#eb2f96" size="lg" style={{fontSize: '32px'}}></Icon></div>
  }
}

export default connect()(Home)