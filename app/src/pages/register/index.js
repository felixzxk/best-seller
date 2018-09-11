import React, { Component } from "react";
import { Button } from "antd-mobile";
import { connect } from 'dva';

class Register3 extends Component {
  render() {
    return <div>hello</div>
  }
}

function mapStateToProps({ app }) {
  return { app }
}

export default connect(mapStateToProps)(Register3)