import React, { Component } from 'react';
import SortedTableHead from './sorted-table-head';
import Pagination from './pagination';
import TableRow from './table-row';
import '../styles/table.css';

class SortedTable extends Component {

  constructor(props) {
    super(props);
    this.handleSorting = this.handleSorting.bind(this);
    this.handleItemsPerPageUpdate = this.handleItemsPerPageUpdate.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handleSorting(fieldData) {
    this.props.handleSorting(fieldData);
  }

  handleItemsPerPageUpdate(itemsPerPage) {
    this.props.handleItemsPerPageUpdate(itemsPerPage);
  }

  handlePageClick(page) {
    this.props.handlePageClick(page);
  }


  render() {
    if (!this.props.tracks || !this.props.sorting || !this.props.pagination) return null;
    return (
      <div className='sorted-table'>
        <h2 className='sorted-table__header'>Playlist</h2>
        <table className='table'>
          <SortedTableHead handleSorting={this.handleSorting} sorting={this.props.sorting} />
          <tbody>
            {this.generateRows()}
          </tbody>
        </table>
        <Pagination
          handleItemsPerPageUpdate={this.handleItemsPerPageUpdate}
          handlePageClick={this.handlePageClick}
          pagination={this.props.pagination} />
      </div>
    );
  }

  generateRows() {
    const page = this.props.pagination.page;
    const itemsPerPage = this.props.pagination.itemsPerPage;
    const tracks = this.props.tracks;
    const tracksListFrame = SortedTable.getArrayFrameByPage(tracks, page, itemsPerPage);
    return (
      tracksListFrame.map(track => {
        return (<TableRow key={track.id} track={track} />);
      })
    )
  }

  static getArrayFrameByPage(array, page, frameSize) {
    if (!array || !page || !Array.isArray(array) || !frameSize) throw new Error('Invalid arguments!');
    const length = array.length;
    const start = (page - 1) * frameSize;
    let end = page * frameSize;
    if (end > length) {
      end = length;
    }
    return array.slice(start, end);
  }

}

export default SortedTable;
