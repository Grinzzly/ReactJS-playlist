import React, { Component } from 'react';
import FilterSelect from './filter-select';
import '../styles/filters.css';

class Filters extends Component {

  constructor(props) {
    super(props);
    this.onSelectArtist = this.onSelectArtist.bind(this);
    this.onSelectGenre = this.onSelectGenre.bind(this);
    this.onSelectYear = this.onSelectYear.bind(this);
  }

  onSelectFilter(filter, value) {
    if (!filter || !value) throw new Error('Invalid arguments');
    this.props.onSelectFilter( { filter, value } );
  }

  onSelectArtist(value) {
    this.onSelectFilter('artist', value);
  }

  onSelectGenre(value) {
    this.onSelectFilter('genre', value);
  }

  onSelectYear(value) {
    this.onSelectFilter('year', (value === 'all' ? value : +value));
  }

  render() {
    const filtersFields =  this.props.filtersFields;
    const filters = this.props.filters;
    if (!filtersFields || !filters || !this.props.onSelectFilter) return null;
    return (
      <div className='filters'>
        <h2 className='filters__header'>Filters</h2>
        <div className='filters__set'>
          <FilterSelect
            onSelectFilter={this.onSelectArtist}
            name={'Artist'}
            options={filtersFields.artist}
            value={filters.artist} />
          <FilterSelect
            onSelectFilter={this.onSelectGenre}
            name={'Genre'}
            options={filtersFields.genre}
            value={filters.genre} />
          <FilterSelect
            onSelectFilter={this.onSelectYear}
            name={'Year'}
            options={filtersFields.year}
            value={filters.year} />
        </div>
      </div>
    );
  }
}

export default Filters;
