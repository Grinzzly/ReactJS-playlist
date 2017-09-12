import React, { Component } from 'react';
import '../styles/table.css';

class TableRow extends Component {

  render() {
    if (!this.props.track) return null;
    const artist = this.props.track.artist;
    const name = this.props.track.name;
    const genre = this.props.track.genre;
    const year = this.props.track.year;
    return (
      <tr className="table__row">
        <td className="table__cell">{artist}</td>
        <td className="table__cell">{name}</td>
        <td className="table__cell">{genre}</td>
        <td className="table__cell">{year}</td>
      </tr>
    );
  }
}

export default TableRow;
