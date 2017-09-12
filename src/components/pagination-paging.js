import React, { Component } from 'react';
import '../styles/pagination.css';

class PaginationPaging extends Component {

  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePrevPageClick = this.handlePrevPageClick.bind(this);
  }

  handlePageClick(e) {
    const page = +e.target.textContent;
    this.props.handlePageClick(page);
  }

  handleNextPageClick() {
    const currentPage = this.props.page;
    const total = this.props.totalPages;
    const page = currentPage === total ? total : currentPage + 1 ;
    this.props.handlePageClick(page);
  }

  handlePrevPageClick() {
    const currentPage = this.props.page;
    const page = currentPage === 1 ? currentPage : currentPage - 1 ;
    this.props.handlePageClick(page);
  }

  render() {
    const page = this.props.page;
    const totalPages = this.props.totalPages;
    if (!page || !totalPages) return null;
    return (
      <div className='paging'>
        <div className='paging__button paging__button--arrow' onClick={this.handlePrevPageClick}>{'<'}</div>
          {this.generatePages(totalPages, page)}
        <div className='paging__button paging__button--arrow' onClick={this.handleNextPageClick}>{'>'}</div>
      </div>
    );
  }

  generatePages(total, page) {
    if (!total || !page) throw new Error('Invalid arguments!');
    const AROUND_PAGES = 2; // should be even
    const result = [];

    let from = (page - AROUND_PAGES < 1) ? 1 : (page - AROUND_PAGES);
    let to = (page + AROUND_PAGES > total) ? total : (page + AROUND_PAGES);
    for (let i = from; i <= to; i++) {
      const button = this.generatePageButton(i);
      result.push(button);
    }

    if (from !== 1) {
      if (from !== 2) {
        let secondButton = PaginationPaging.generateDots();
        if (from === 3) {
          secondButton = this.generatePageButton(2);
        }
        result.unshift(secondButton);
      }
      result.unshift(this.generatePageButton(1));
    }


    if (to !== total) {
      if (from !== total - 1) {
        let penultimateButton = PaginationPaging.generateDots();
        if (from === total - 2) {
          penultimateButton = this.generatePageButton(total - 1);
        }
        result.push(penultimateButton);
      }
      result.push(this.generatePageButton(total));
    }

    return result;

  }

  generatePageButton(number) {
    if (!number) throw new Error('Invalid arguments!');
    return (
      <div
        onClick={this.handlePageClick}
        className={'paging__button ' + (this.props.page === number ? 'paging__button--active' : '')}
        key={number}>{number}</div>
    )
  }

  static generateDots() {
    return (
      <div key={Math.random()} className='paging__button paging__button--dots'>{'...'}</div>
    )
  }

}

export default PaginationPaging;
