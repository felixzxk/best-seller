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
    // console.log(this.wrap.current, this.container.current);
    let startPoint = 0;
    let distance = 0;
    const _wrap = this.wrap.current;
    _wrap.addEventListener(
      'touchstart',
      function(e) {
        // console.log(e.target);
        if (e.target.scrollTop === 0) {
          startPoint = e.changedTouches[0].screenY;
        }
      },
      false
    );

    _wrap.addEventListener(
      'touchmove',
      function(event) {
        distance = event.changedTouches[0].screenY - startPoint;
        if (distance > 0 && event.target.scrollTop === 0) {
          _wrap.style.position = 'relative';
          _wrap.style.top = distance + 'px';
        }
      },
      false
    );
    _wrap.addEventListener(
      'touchend',
      function(event) {
        _wrap.style.position = 'static';
        _wrap.style.top = 0;
        if (distance > 100) {
          console.log('下拉刷新');
        }
        startPoint = 0;
        distance = 0;
      },
      false
    );
  }
  scrollHandler = e => {
    e.preventDefault();
    if (e.target.scrollTop === 0) {
    }
  };
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
