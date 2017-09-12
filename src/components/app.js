import React, { Component } from 'react';
import TRACKS from '../mocks/tracks.json';
import FilteredTable from './filtered-table';
import '../styles/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawTracks: null
    };
  };

  componentDidMount() {
    this.getTracksList()
      .then(tracks => {
        const parsedTracks = Array.isArray(tracks) ?  tracks : App._tryParseJSONString(tracks);
        this.setState({rawTracks: parsedTracks});
      })
      .catch(err => {
        throw err;
      });
  };

  render() {
    if (!this.state.rawTracks) return null;
    return (
      <div className="app">
        <FilteredTable rawTracks={this.state.rawTracks} />
      </div>
    );
  };

  getTracksList() {
    return new Promise((resolve, reject) => {
      const tracks = TRACKS;
      if (!tracks && !tracks.length) {
        return reject(new Error('Unable to load tracks list'));
      }
      resolve(tracks);
    })
  };

  static  _tryParseJSONString(string) {
    let result = null;
    try {
      result = JSON.parse(string);
    }
    catch(e) {
      throw e;
    }
    return result;
  };
}

export default App;
