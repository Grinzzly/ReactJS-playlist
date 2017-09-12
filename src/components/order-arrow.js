import React, { Component } from 'react';
import '../styles/table.css';

class OrderArrow extends Component {

  render() {
    const order = this.props.order;
    return (
      <span className={'table__arrow ' + (order ? 'table__arrow--active' : '') }>
        {!order ? '<>' : order === 'asc' ? '>' : '<'}
      </span>
    );
  }
}

export default OrderArrow;
