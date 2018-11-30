const mongoose = require('mongoose');
const Player = require('../models/player')
var ObjectId = mongoose.Schema.Types.ObjectId;

const PlayDetailSchema = new mongoose.Schema({
  section: {
    type: String,
  },
  content: {
    type: String,
  }
});

const PlaySchema = new mongoose.Schema({
  name: {
    type: String
  },
  heading: {
    type: String
  },
  summary: {
    type: String
  },
  detail: [PlayDetailSchema],
  players: [ { type : ObjectId, ref: 'Player'} ]
});

const PlayDetail = mongoose.model('PlayDetail', PlayDetailSchema);
const Play = mongoose.model('Play', PlaySchema);
module.exports = PlayDetail;
module.exports = Play;
