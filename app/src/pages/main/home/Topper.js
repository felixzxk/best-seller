import React from 'react';
import _ from 'lodash';
import styles from './topper.less';

const SPLIT = [1, 2, 3, 4, 10];
const STEP = 0.15;

const Col = ({ data, size }) => {
  const width = (1 / size) * window.innerWidth;
  const avatarSize = width * 0.8 * (1 - (SPLIT.length - size) * STEP);
  const rankSize = width * 0.3 * (1 - (SPLIT.length - size) * STEP);
  const style = {
    flexGrow: 1 / size,
    width: `${width}px`,
  };
  const sizeStyle = {
    width: `${avatarSize}px`,
    height: `${avatarSize}px`,
  };
  const rankingColor = (ranking => {
    switch (ranking) {
      case 1: {
        return { backgroundColor: '#f5980e', color: '#333' };
      }
      case 2: {
        return { backgroundColor: '#9caaad', color: '#333' };
      }
      case 3: {
        return { backgroundColor: '#da4a13', color: '#fff' };
      }
      case 4:
      case 5:
      case 6: {
        return { backgroundColor: '#a7802a', color: '#fff' };
      }
      case 7:
      case 8:
      case 9:
      case 10: {
        return { backgroundColor: '#5d794c', color: '#fff' };
      }
      default: {
        return { backgroundColor: '#679ab3', color: '#fff' };
      }
    }
  })(data.ranking);
  const sizeStyleRank = {
    width: `${rankSize}px`,
    height: `${rankSize}px`,
    lineHeight: `${rankSize}px`,
    fontSize: `${rankSize * 0.6}px`,
    ...rankingColor,
  };
  const sizeStyleCount = {
    height: `${rankSize * 0.8}px`,
    lineHeight: `${rankSize * 0.8}px`,
    fontSize: `${rankSize * 0.4}px`,
    ...rankingColor,
  }
  return (
    <div className={styles.wrap} style={style}>
      <div className={styles.avatar} style={sizeStyle}>
        <div style={sizeStyleRank} className={styles.ranking}>
          {data.ranking}
        </div>
        <div className={styles.count} style={sizeStyleCount}>{data.count}</div>
        <img className={styles.avatar} style={sizeStyle} src={data.avatar} alt={data.name} />
      </div>
      <div className={styles.name}>{data.name}</div>
      <div className={styles.area}>{data.areaText.split(' ')[0]}</div>
    </div>
  );
};

const Row = props => {
  const { data, size } = props;
  return (
    <div className={styles.rowWrap}>
      {_.map(data, d => (
        <Col key={d.id} data={d} size={size} />
      ))}
    </div>
  );
};

export default class Topper extends React.PureComponent {
  state = {};
  splitData = (data, split) => {
    let before = 0;
    return _.map(split, n => {
      const _data = [...data];
      const res = _.slice(_data, before, n + before);
      before += n;
      return res;
    });
  };
  render() {
    const colData = this.splitData(this.props.data, SPLIT);
    return (
      <div>
        {_.map(colData, (data, index) => (
          <Row key={`row_${index}`} data={data} size={index + 1} />
        ))}
      </div>
    );
  }
}
