import React, { Component } from 'React';
import _ from 'lodash';
import styles from './index.less';

export default class FlatLister extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.wrap = React.createRef();
    this.container = React.createRef();
  }
  renderRows = data => {
    if (_.isFunction(this.props.renderRow)) {
      return _.map(data, (d, i) => {
        return this.props.renderRow(d, i);
      });
    }
    throw new Error('renderRow must be a function, and return a React Element');
  };
  componentDidMount() {
    console.log(this.wrap.current, this.container.current);
    this.wrap.current.addEventListener('onScroll', function(e){
      console.log(e.target)
    })
    // TODO 在这里绑定事件
  }
  scrollHandler = (e) => {
    e.preventDefault()
    console.log(e.target.scrollTop)
  }
  render() {
    return (
      <div className={styles.wrap} ref={this.wrap} onScroll={this.scrollHandler}>
        <div className={styles.container} ref={this.container}>
          <div className={styles.scroll}>{this.renderRows(this.props.data)}</div>
        </div>
      </div>
    );
  }
}
