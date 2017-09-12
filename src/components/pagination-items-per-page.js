import React, { Component } from 'react';
import PaginationItemsPerPageButton from './pagination-items-per-page-button';
import '../styles/pagination.css';

const ITEMS_PER_PAGE = [10, 25, 50, 100];

class PaginationItemsPerPage extends Component {

  constructor(props) {
    super(props);
    this.handleItemsPerPageUpdate = this.handleItemsPerPageUpdate.bind(this);
  }

  handleItemsPerPageUpdate(itemsPerPage) {
    this.props.handleItemsPerPageUpdate(itemsPerPage);
  }


  render() {
    if (!this.props.itemsPerPage) return null;
    return (
      <div className='items-per-page'>
        {this.generateItems(ITEMS_PER_PAGE)}
      </div>
    );
  }

  generateItems(listOfValues) {
    const currentItemsPerPage = this.props.itemsPerPage;
    if (!currentItemsPerPage || !listOfValues || !Array.isArray(listOfValues)) throw new Error('Invalid arguments!');
    return (listOfValues.map(value => {
        return (
          <PaginationItemsPerPageButton
            handleItemsPerPageUpdate={this.handleItemsPerPageUpdate}
            key={value}
            value={value}
            active={value === currentItemsPerPage} />
        )
      })
    )
  }
}

export default PaginationItemsPerPage;
