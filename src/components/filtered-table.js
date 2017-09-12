import React, { Component } from 'react';
import SortedTable from './sorted-table';
import Filters from './filters';
import '../styles/table.css';

const DEFAULT_FILTERS = {
  artist: 'all',
  genre: 'all',
  year: 'all'
};

const DEFAULT_PAGINATION = {
  page: 1,
  itemsPerPage: 10,
  totalPages: 1
};

const DEFAULT_SORTING = {
  field: 'artist',
  order: 'asc'
};

const DEFAULT_FILTERS_FIELDS = {
  artist: ['all'],
  genre: ['all'],
  year: ['all']
};

class FilteredTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: props.rawTracks.slice(),
      filters: Object.assign({}, DEFAULT_FILTERS),
      pagination: Object.assign({}, DEFAULT_PAGINATION),
      sorting: Object.assign({}, DEFAULT_SORTING),
      filtersFields: Object.assign({}, DEFAULT_FILTERS_FIELDS)
    };
    this.handleSorting = this.handleSorting.bind(this);
    this.updateItemsPerPage = this.updateItemsPerPage.bind(this);
    this.updatePageNumber = this.updatePageNumber.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  };

  componentDidMount() {
    if (!this.props.rawTracks) return;

    this.updateFiltersFields(this.props.rawTracks);
    this.applyAllFiltersToTracks(this.props.rawTracks);
    this.updatePaginationTotalPages();
  }

  componentWillReceiveProps(nextProps) {
    this.resetAllFilters();
    this.updateFiltersFields(nextProps.rawTracks);
    this.applyAllFiltersToTracks(nextProps.rawTracks);
    this.updatePaginationTotalPages();
  }

  render() {
    if (!this.state.tracks) return null;
    return (
      <div className="filtered-table">
        <SortedTable
          handleSorting={this.handleSorting}
          tracks={this.state.tracks}
          pagination={this.state.pagination}
          handleItemsPerPageUpdate={this.updateItemsPerPage}
          handlePageClick={this.updatePageNumber}
          sorting={this.state.sorting} />
        <Filters
          filters={this.state.filters}
          onSelectFilter={this.updateFilter}
          filtersFields={this.state.filtersFields} />
      </div>
    );
  }

  handleSorting(fieldData) {
    const fieldValue = fieldData.field;
    this.updateSorting(fieldValue);
  }

  updateSorting(field) {
    this.setState((prevState) => {
      const oldField = prevState.sorting.field;
      const oldOrder = prevState.sorting.order;
      return {
        sorting: {
          field: field,
          order: field === oldField ? FilteredTable.getReversedSortingFilerOrder(oldOrder) : DEFAULT_SORTING.order
        }
      }
    });
    this.applySortingToTracks();
    this.updatePaginationTotalPages();
  }

  updateItemsPerPage(itemsPerPage) {
    if (!itemsPerPage || this.state.pagination.itemsPerPage === itemsPerPage) return;
    this.setState(prevState => {
      const totalItems = prevState.tracks.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const page = 1;
      return {
        pagination: {
          page,
          totalPages,
          itemsPerPage
        }
      }
    })
  }

  updatePageNumber(page) {
    if (!page || Number.isNaN(page)) throw new Error('Invalid page number!');
    this.setState(prevState => {
      const totalPages = prevState.pagination.totalPages;
      const itemsPerPage = prevState.pagination.itemsPerPage;
      const newPage = (page < 1) ? 1 : ((page > totalPages) ? totalPages : page);
      return {
        pagination: {
          totalPages,
          itemsPerPage,
          page: newPage
        }
      }
    });
  }

  applySortingToTracks() {
    this.setState((prevState) => {
      const sorting = prevState.sorting;
      const sortingFunction = FilteredTable.getFieldSortingFunction(sorting.field, sorting.order);
      const filteredTracks = this.state.tracks.slice();
      filteredTracks.sort(sortingFunction);
      return {
        tracks: filteredTracks,
      }
    });
  }


  applyAllFiltersToTracks(rawTracks) {
    if (!rawTracks || !Array.isArray(rawTracks)) throw new Error('Invalid array');

    this.setState((prevState, props) => {
      const filter = prevState.filters;
      const sorting = prevState.sorting;
      const sortingFunction = FilteredTable.getFieldSortingFunction(sorting.field, sorting.order);
      let filteredTracks = [];
      filteredTracks = rawTracks.filter((el, index) => {
        return (FilteredTable.isArtistValid(el.artist, filter.artist)
          && FilteredTable.isGenreValid(el.genre, filter.genre)
          && FilteredTable.isYearValid(el.year, filter.year));
      });

      filteredTracks.sort(sortingFunction);
      return {
        tracks: filteredTracks,
      }
    });
  };

  resetAllFilters() {
    this.resetFilters();
    this.resetSorting();
    this.resetPagination();
  }

  resetPagination() {
    this.setState({
      pagination: Object.assign({}, DEFAULT_PAGINATION)
    });
  }

  resetSorting() {
    this.setState({
      sorting: Object.assign({}, DEFAULT_SORTING)
    });
  }

  resetFilters() {
    this.setState({
      filters: Object.assign({}, DEFAULT_FILTERS)
    });
  }

  updateFiltersFields(rawTracks) {
    if (!rawTracks) return;

    const filters = Object.assign({}, DEFAULT_FILTERS_FIELDS);
    filters.artist = filters.artist.concat(this.getUniqueValuesByKeyFromArray(rawTracks, 'artist').sort());
    filters.genre = filters.genre.concat(this.getUniqueValuesByKeyFromArray(rawTracks, 'genre').sort());
    filters.year = filters.year.concat(this.getUniqueValuesByKeyFromArray(rawTracks, 'year').sort());

    this.setState({
      filtersFields: filters
    });
  }

  updateFilter({filter, value}) {
    if (!filter || !value) throw new Error('Invalid state arguments!');
    this.setState(prevState => {
      const newFilter = Object.assign({}, prevState.filters);
      newFilter[filter] = value;
      return {
        filters: newFilter
      };
    });
    this.applyAllFiltersToTracks(this.props.rawTracks);
    this.updatePaginationTotalPages();
  }

  getUniqueValuesByKeyFromArray(array, key) {
    if (!Array.isArray(array) || !key) throw new Error('Invalid arguments');

    const unique = [...new Set(array.map(item => item[key]))];
    return unique;
  }

  updatePaginationTotalPages() {
    this.setState((prevState, props) => {
      const tracks = prevState.tracks;
      const itemsPerPage = prevState.pagination.itemsPerPage;
      const totalItems = tracks.length;
      const newTotalPages = Math.ceil(totalItems / itemsPerPage);
      return {
        pagination: {
          page: 1,
          totalPages: newTotalPages,
          itemsPerPage: itemsPerPage
        }
      }
    })
  }

  static isArtistValid(artist, filterValue) {
    return FilteredTable.isValuePassFilter(artist, filterValue);
  }

  static isGenreValid(genre, filterValue) {
    return FilteredTable.isValuePassFilter(genre, filterValue);
  }

  static isYearValid(year, filterValue) {
    return FilteredTable.isValuePassFilter(year, filterValue);
  }

  static isValuePassFilter(value, filterValue) {
    return filterValue === 'all' || value === filterValue;
  }

  static getFieldSortingFunction(field, order) {
    let sortingFunction = function() {};
    if (field === 'year') {
      sortingFunction = function(a, b) {
        const aValue = a[field];
        const bValue = b[field];
        return (order === 'asc' ? (aValue - bValue) : (bValue - aValue));
      };
    } else {
      sortingFunction = function(a, b) {
        //a.localeCompare(b)?
        const aValue = a[field];
        const bValue = b[field];
        const loweredA = aValue.toLowerCase();
        const loweredB = bValue.toLowerCase();
        if (loweredA < loweredB) return (order === 'asc' ? -1 : 1);
        if (loweredA > loweredB) return (order === 'asc' ? 1 : -1);
        return 0;
      };
    }
    return sortingFunction;
  }

  static getReversedSortingFilerOrder(order) {
    return (order === 'asc' ? 'desc' : 'asc');
  }

}

export default FilteredTable;
