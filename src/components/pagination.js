import React, { Component } from 'react';
import PaginationPaging from './pagination-paging';
import PaginationItemsPerPage from './pagination-items-per-page';
import '../styles/pagination.css';

class Pagination extends Component {

  constructor(props) {
    super(props);
    this.handleItemsPerPageUpdate = this.handleItemsPerPageUpdate.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handleItemsPerPageUpdate(itemsPerPage) {
    this.props.handleItemsPerPageUpdate(itemsPerPage);
  }

  handlePageClick(page) {
    this.props.handlePageClick(page);
  }


  render() {
    if (!this.props.pagination) return null;
    const page = this.props.pagination.page;
    const itemsPerPage = this.props.pagination.itemsPerPage;
    const totalPages = this.props.pagination.totalPages;
    return (
      <div className='pagination'>
        <PaginationPaging handlePageClick={this.handlePageClick} page={page} totalPages={totalPages} />
        <PaginationItemsPerPage handleItemsPerPageUpdate={this.handleItemsPerPageUpdate} itemsPerPage={itemsPerPage} />
      </div>
    );
  }
}

export default Pagination;
