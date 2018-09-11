import React, { Component } from "react";
import { Button } from "antd-mobile";
import { connect } from 'dva';

class Layout extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps({ app }) {
  return { app }
}

export default connect(mapStateToProps)(Layout)