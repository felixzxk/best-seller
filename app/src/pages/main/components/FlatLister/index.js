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
  startPoint = 0;
  distance = 0;
  startHandler = (e) => {
    this.startPoint = e.changedTouches[0].screenY;
  }
  moveHandler = (e) => {
    this.distance = e.changedTouches[0].screenY - this.startPoint;
    const _wrap = this.wrap.current;
    const _container = this.container.current;
    if (
      (this.distance > 0 && _wrap.scrollTop === 0) ||
      (this.distance <= 0 && (_wrap.scrollTop >= _container.clientHeight - _wrap.clientHeight))
    ) {
      _wrap.style.top = this.distance > 100 ? 100 : (this.distance < -100 ? -100 : this.distance) + 'px';
    }
  }
  endHandler = () => {
    const _wrap = this.wrap.current;
    const _container = this.container.current;
    _wrap.style.top = 0;
    if (this.distance > 100 && _wrap.scrollTop === 0) {
      console.log('下拉刷新');
    }
    if (this.distance <= -100 && (_wrap.scrollTop >= _container.clientHeight - _wrap.clientHeight)) {
      console.log('上拉加载');
    }
    this.startPoint = 0;
    this.distance = 0;
  }
  setListener = (type) => {
    const _wrap = this.wrap.current;
    _wrap[type](
      'touchstart',
      this.startHandler,
      false
    );
    _wrap[type](
      'touchmove',
      this.moveHandler,
      false
    );
    _wrap[type](
      'touchend',
      this.endHandler,
      false
    );
  };
  componentDidMount() {
    this.setListener('addEventListener');
  }
  componentWillUnmount() {
    this.setListener('removeEventListener');
  }
  scrollHandler = e => {
    e.preventDefault();
    if (_.isFunction(this.props.onScroll)) {
      this.props.onScroll(e)
    }
  };
  render() {
    return (
      <div className={styles.outer}>
        <div className={styles.bgBox} style={{top: 0}}>下拉刷新</div>
        <div className={styles.wrap} ref={this.wrap} onScroll={this.scrollHandler}>
          <div className={styles.container} ref={this.container}>
            {this.renderRows(this.props.data)}
          </div>
        </div>
        <div className={styles.bgBox} style={{bottom: 0}}>上拉加载</div>
      </div>
    );
  }
}
