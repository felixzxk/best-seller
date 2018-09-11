import React, { Component } from "react";
import { connect } from "dva";

class Home extends Component {
  render(){
    return <div>home</div>
  }
}

export default connect()(Home)