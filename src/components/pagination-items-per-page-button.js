import React, { Component } from 'react';
import '../styles/pagination.css';

class PaginationItemsPerPageButton extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.handleItemsPerPageUpdate(this.props.value);
  }


  render() {
    const value = this.props.value;
    if (!this.props.value || !this.props.handleItemsPerPageUpdate) return null;
    return (
      <div onClick={this.handleClick} className={'items-per-page__button ' + (this.props.active ? 'items-per-page__button--active' : '')}>
        {value}
      </div>
    );
  }

}

export default PaginationItemsPerPageButton;
