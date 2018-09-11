import React, { Component } from "react";
import { connect } from "dva";

class Favorite extends Component {
  render(){
    return <div>Favorite</div>
  }
}

export default connect()(Favorite)