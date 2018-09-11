import React, { Component } from "react";
import { connect } from "dva";

class Personal extends Component {
  render(){
    return <div>personal</div>
  }
}

export default connect()(Personal)