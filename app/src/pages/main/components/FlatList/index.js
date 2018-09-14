import React, { Component } from 'React';
import _ from 'lodash';
import styles from './index.less';

const THRESHOLD_DEFAULT = 100;

export default class FlatList extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
    this.wrap = React.createRef();
    this.container = React.createRef();
    this.boxTop = React.createRef();
    this.boxBottom = React.createRef();
  }
  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.isLoading !== nextState.isLoading) {
      return { isLoading: nextProps.isLoading };
    }
    return null;
  }
  componentDidUpdate() {
    if(!this.props.isLoading){
      this.loadFinished()
    }
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
  startHandler = e => {
    this.startPoint = e.changedTouches[0].screenY;
  };
  moveHandler = e => {
    this.distance = e.changedTouches[0].screenY - this.startPoint;
    const threshold = this.props.threshold || THRESHOLD_DEFAULT;
    const _wrap = this.wrap.current;
    const _container = this.container.current;
    const _boxTop = this.boxTop.current;
    const _boxBottom = this.boxBottom.current;
    const beyondTop = this.distance > 0 && _wrap.scrollTop === 0;
    const overEnd =
      this.distance <= 0 && _wrap.scrollTop >= _container.clientHeight - _wrap.clientHeight;
    const topValue =
      this.distance > threshold
        ? threshold
        : this.distance < threshold * -1
          ? threshold * -1
          : this.distance;
    if (beyondTop || overEnd) {
      function setBoxStyle(context, PlusOrMinus = 1) {
        _wrap.style.top = topValue + 'px';
        const opacityStyle = Math.abs(topValue) / threshold;
        const fontSizeStyle = Math.abs(topValue) / (threshold * 0.8) + 'em';
        const _height = topValue * PlusOrMinus + 'px';
        context.style.height = _height;
        context.style.lineHeight = _height;
        context.style.opacity = opacityStyle;
        context.style.fontSize = fontSizeStyle;
      }
      if (beyondTop) {
        setBoxStyle(_boxTop);
      } else if (overEnd && this.props.allowLoadMore) {
        setBoxStyle(_boxBottom, -1);
      }
    }
  };
  loadFinished = () => {
    const _wrap = this.wrap.current;
    const _boxBottom = this.boxBottom.current;
    const _boxTop = this.boxTop.current;
    _wrap.style.top = 0;
    this.startPoint = 0;
    this.distance = 0;
    _boxBottom.style.height = 0;
    _boxBottom.style.lineHeight = 0;
    _boxBottom.style.opacity = 0;
    _boxBottom.style.fontSize = 0;
    _boxTop.style.height = 0;
    _boxTop.style.lineHeight = 0;
    _boxTop.style.opacity = 0;
    _boxTop.style.fontSize = 0;
  };
  endHandler = () => {
    const _wrap = this.wrap.current;
    const _container = this.container.current;
    const threshold = this.props.threshold || THRESHOLD_DEFAULT;
    if (this.distance > threshold && _wrap.scrollTop === 0) {
      if (_.isFunction(this.props.onPull)) {
        this.props.onPull();
      }
    }
    if (
      this.distance <= threshold * -1 &&
      _wrap.scrollTop >= _container.clientHeight - _wrap.clientHeight
    ) {
      if (_.isFunction(this.props.onPush)) {
        this.props.onPush();
      }
    }
  };
  setListener = type => {
    const _wrap = this.wrap.current;
    _wrap[type]('touchstart', this.startHandler, false);
    _wrap[type]('touchmove', this.moveHandler, false);
    _wrap[type]('touchend', this.endHandler, false);
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
      this.props.onScroll(e);
    }
  };
  render() {
    return (
      <div className={styles.outer}>
        <div className={styles.bgBox} ref={this.boxTop} style={{ top: 0 }}>
          {this.props.pullText || '刷新'}
        </div>
        <div className={styles.wrap} ref={this.wrap} onScroll={this.scrollHandler}>
          <div className={styles.container} ref={this.container}>
            {this.renderRows(this.props.data)}
          </div>
        </div>
        <div className={styles.bgBox} ref={this.boxBottom} style={{ bottom: 0 }}>
          {this.props.pushText || '加载更多'}
        </div>
      </div>
    );
  }
}
