import React, { Component } from 'react';
import OrderArrow from './order-arrow';
import '../styles/table.css';

class SortingCell extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onSortingCellClick({field: this.props.fieldName})
  }

  render() {
    if (!this.props.name || !this.props.onSortingCellClick || !this.props.fieldName) return null;
    return (
      <th
        onClick={this.handleClick}
        className="table__cell table__cell--head">
        <div className="table__text table__text--head">
          <span>{this.props.name}</span>
          <OrderArrow order={this.props.order}/>
        </div>
      </th>
    );
  }
}

export default SortingCell;
