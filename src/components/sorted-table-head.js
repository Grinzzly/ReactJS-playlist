import React, { Component } from 'react';
import SortingCell from './sorting-cell';
import '../styles/table.css';

class SortedTableHead extends Component {

  constructor(props) {
    super(props);
    this.handleSorting = this.handleSorting.bind(this);
  }

  handleSorting(fieldData) {
    this.props.handleSorting(fieldData);
  }

  render() {
    if (!this.props.sorting) return null;
    const order = this.props.sorting.order;
    const sortingField = this.props.sorting.field;
    return (
      <thead className="table__head">
        <tr className="table__row table__row--head">
          <SortingCell
            onSortingCellClick={this.handleSorting}
            name={'Artist'}
            fieldName={'artist'}
            order={sortingField === 'artist' ? order : null } />
          <SortingCell
            onSortingCellClick={this.handleSorting}
            name={'Track name'}
            fieldName={'name'}
            order={sortingField === 'name' ? order : null } />
          <SortingCell
            onSortingCellClick={this.handleSorting}
            name={'Genre'}
            fieldName={'genre'}
            order={sortingField === 'genre' ? order : null } />
          <SortingCell
            onSortingCellClick={this.handleSorting}
            name={'Year'}
            fieldName={'year'}
            order={sortingField === 'year' ? order : null } />
        </tr>
      </thead>
    );
  }
}

export default SortedTableHead;
