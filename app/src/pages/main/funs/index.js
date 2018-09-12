import React, { Component } from "react";
import { connect } from "dva";

class Funs extends Component {
  render(){
    return <div style={{height: '2000px'}}>funs</div>
  }
}

export default connect()(Funs)