const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const PlayerSchema = new mongoose.Schema({
  _id: ObjectId,
  name: {
    type: String,
  },
  team: {
    type: String,
  },
  summary: {
    type: String,
  },
  detail: {
    type: String,
  },
  position: {
    type: String,
  },
  responsibilities: {
    type: String,
  }
});

const DetailSchema = new mongoose.Schema({
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
  detail: [DetailSchema],
  players: [ { type : ObjectId, ref: 'Player'} ]
});

const Player = mongoose.model('Player', PlayerSchema);
const Detail = mongoose.model('Detail', DetailSchema);
const Play = mongoose.model('Play', PlaySchema);
module.exports = Player;
module.exports = Detail;
module.exports = Play;
