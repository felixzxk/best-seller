import React, { Component } from "react";
import { connect } from "dva";

class Funs extends Component {
  render(){
    return <div>funs</div>
  }
}

export default connect()(Funs)