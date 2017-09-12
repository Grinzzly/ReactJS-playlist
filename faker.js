const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');

const GENRES = [
  'Rap',
  'Rock',
  'R\'n\'B',
  'Pop',
  'Jazz',
  'Band'
];
const DIR_PATH = path.join(__dirname, '/src/mocks');
const FILE_PATH = path.join(__dirname, '/src/mocks/tracks.json');
const quantity = 100;

(function generate() {
  if (!fs.existsSync(DIR_PATH)){
    fs.mkdirSync(DIR_PATH);
  }
  fs.writeFile(FILE_PATH, generateSongsJSON(quantity), err => {
    if(err) {
      throw err;
    }
  });
})();

function getRandomNumber(min, max) {
    if (min >= max || Number.isNaN(min) || Number.isNaN(max)) {
        throw new Error(`Invalid interval:  ${min} ${max}`);
    }
    return Math.round(Math.random() * (max - min) + min);
};

function generateSongsJSON(quantity) {
  if (Number.isNaN(quantity) || quantity < 1) {
    throw new Error('Invalid quantity');
  }

  let songs = '[]';
  try {
    songs = JSON.stringify(generateSongs(quantity));
  }
  catch(e) {
    throw e;
  }
  return songs;
};


function generateSongs(quantity) {
  if (Number.isNaN(quantity) || quantity < 1) {
    throw new Error('Invalid quantity');
  }

  const result = [];
  for (let i = 0; i < quantity; i++) {
    const song = {
      "id": generateSongId(),
      "artist": generateArtist(),
      "name": generateSongName(),
      "genre": generateGenre(),
      "year": generateYear(),
    };
    result.push(song);
  }

  return result;
};

function generateSongId() {
  return uuidv4();
};

function generateArtist() {
  return `Artist ${getRandomNumber(1, 20)}`
};

function generateSongName() {
  return `Song ${getRandomNumber(1, 20)}`
};

function generateGenre() {
  return GENRES[getRandomNumber(0, GENRES.length - 1)];
};

function generateYear() {
  return getRandomNumber(1960, 2017);
};




