import { Component } from 'React';
import _ from 'lodash';

export default class FlatList extends Component {
  renderRows = data => {
    if (_.isFunction(this.props.renderRow)) {
      return _.map(data, (d, i) => {
        return this.props.renderRow(d, i);
      });
    }
    throw new Error('renderRow must be a function, and return a React Element');
  };
  render() {
    if (this.props.data.length < 1) {
      return null;
    }
    return this.renderRows(this.props.data);
  }
}
